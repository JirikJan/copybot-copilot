import os
from typing import List, Dict, Any, Literal, cast, Union, Optional
from langchain_core.messages import SystemMessage, AIMessage, ToolMessage, HumanMessage, RemoveMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import START, StateGraph, MessagesState, END
from langgraph.prebuilt import ToolNode
from langgraph.types import Command, interrupt
from langchain_core.tools import tool
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.document_loaders import FireCrawlLoader
from copilotkit import CopilotKitState, LangGraphAgent
from langchain_core.runnables import RunnableConfig
from copilotkit.langgraph import copilotkit_customize_config, copilotkit_emit_state, copilotkit_emit_message, copilotkit_exit

# ====== 1) DEFINICE STAVU ======
class CopywriterState(MessagesState, CopilotKitState):
    """State combining MessagesState and CopilotKitState for frontend-backend integration."""
    isProcessing: bool = False
    scrape_result: Optional[Dict] = None
    copy_result: Optional[Dict] = None
    search_result: Optional[Dict] = None
    current_task: str = ""
    logs: List[Dict] = []
    requires_user_feedback: bool = False
    user_feedback: Optional[str] = None

# ====== 2) DEFINICE NÁSTROJŮ ======
@tool
async def firecrawl_scrape(url: str, mode: str = "scrape", state: Dict = None, config: RunnableConfig = None) -> str:
    """Provede web scraping na zadané URL pomocí FireCrawl."""
    api_key = os.getenv("FIRECRAWL_API_KEY")
    if not api_key:
        raise ValueError("API key for FireCrawl is not set.")
    
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    
    # Přidáme záznam do logů o začátku scrapování
    if state and config:
        log_entry = {"message": f"🔍 Scrapuji stránku: {url}", "done": False}
        state["logs"].append(log_entry)
        await copilotkit_emit_state(config, state)
    
    try:
        loader = FireCrawlLoader(api_key=api_key, url=url, mode=mode)
        docs = loader.load()
        result = "\n".join([doc.page_content for doc in docs])
        
        # Aktualizujeme log o dokončení
        if state and config:
            state["logs"][-1]["done"] = True
            state["scrape_result"] = {"url": url, "content": result[:100] + "..." if len(result) > 100 else result}
            await copilotkit_emit_state(config, state)
        
        return result
    except Exception as e:
        error_msg = f"Chyba při scrapování URL {url}: {str(e)}"
        
        # Aktualizujeme log o chybě
        if state and config:
            state["logs"][-1]["done"] = True
            state["logs"][-1]["error"] = error_msg
            await copilotkit_emit_state(config, state)
        
        return error_msg

@tool
async def generate_copy(product: str, audience: str, tone: str = "persuasive", state: Dict = None, config: RunnableConfig = None) -> str:
    """Vytvoří profesionální prodejní copy na základě zadaného produktu a cílové skupiny."""
    
    # Přidáme záznam do logů o začátku generování
    if state and config:
        log_entry = {"message": f"✍️ Generuji copy pro: {product}", "done": False}
        state["logs"].append(log_entry)
        await copilotkit_emit_state(config, state)
    
    try:
        result = f"🚀 Profesionální copy pro {product} určené pro {audience} ({tone} styl): Objevte revoluční řešení! 🔥"
        
        # Aktualizujeme log o dokončení
        if state and config:
            state["logs"][-1]["done"] = True
            state["copy_result"] = {"product": product, "audience": audience, "tone": tone}
            await copilotkit_emit_state(config, state)
        
        return result
    except Exception as e:
        error_msg = f"Chyba při generování copy: {str(e)}"
        
        # Aktualizujeme log o chybě
        if state and config:
            state["logs"][-1]["done"] = True
            state["logs"][-1]["error"] = error_msg
            await copilotkit_emit_state(config, state)
        
        return error_msg

@tool
async def review_copy(copy_text: str) -> str:
    """
    Požádá uživatele o zpětnou vazbu k vygenerovanému copy textu.
    Tento nástroj vrací kontrolu uživateli.
    """
    # Tento nástroj je prázdný, protože slouží jako signál k přechodu do feedback_node
    pass

tavily_search = TavilySearchResults()
tools = [generate_copy, tavily_search, firecrawl_scrape, review_copy]

# ====== 3) KONFIGURACE LLM ======
llm = ChatOpenAI(model="gpt-4o")

# ====== 4) SMĚROVACÍ FUNKCE ======
def route_based_on_tools(state: CopywriterState) -> Literal["tools", "feedback_node", "__end__"]:
    """
    Funkce pro směrování toku zpracování na základě stavu a zpráv.
    """
    messages = state.get("messages", [])
    if not messages:
        return "tools"
    
    last_message = messages[-1]
    
    # Kontrola pro nástroj review_copy, který vyžaduje zpětnou vazbu uživatele
    if (hasattr(last_message, "tool_calls") and last_message.tool_calls):
        for tool_call in last_message.tool_calls:
            if tool_call.get("name") == "review_copy":
                return "feedback_node"
        return "tools"
    
    # Pokud je poslední zpráva od AI a nemá tool_calls, končíme zpracování
    if isinstance(last_message, AIMessage) and not getattr(last_message, "tool_calls", None):
        return "__end__"
    
    # Defaultně končíme zpracování, abychom předešli nekonečným smyčkám
    return "__end__"

# ====== 5) NODE FUNKCE PRO LLM A ZPĚTNOU VAZBU ======
async def tool_calling_llm(state: CopywriterState, config: RunnableConfig):
    """
    Node funkce pro zpracování zpráv a volání LLM.
    """
    print("Start tool_calling_llm, stav:", state)
    
    # Kontrola a inicializace při prvním průchodu (dodržuje "Message Flow")
    if not state.get("messages"):
        # Při prvním průchodu emitujeme uvítací zprávu a vracíme inicializovaný stav
        init_message = "Copywriting asistent je připraven pomoci vám s marketingovými texty."
        await copilotkit_emit_message(config, init_message)
        
        return {
            "messages": [SystemMessage(content="Inicializace chatbota.")],
            "isProcessing": True,
            "logs": []
        }
    
    state["isProcessing"] = True
    auth_token = config.get('configurable', {}).get('authToken', None)
    if auth_token and "FIRECRAWL_API_KEY" not in os.environ:
        os.environ["FIRECRAWL_API_KEY"] = auth_token
    
    await copilotkit_emit_state(config, {"status": "processing_started"})
    
    # Konfigurace podle dokumentace "Emitting Messages for long running tasks"
    config = copilotkit_customize_config(
        config,
        emit_intermediate_state=[{
            "state_key": "scrape_result",
            "tool": "firecrawl_scrape",
            "tool_argument": "url",
        }, {
            "state_key": "copy_result", 
            "tool": "generate_copy",
            "tool_argument": "product",
        }, {
            "state_key": "search_result",
            "tool": "tavily_search",
            "tool_argument": "query",
        }],
        emit_messages=True,
        emit_tool_calls=True
    )
    
    all_tools = tools.copy()
    if "copilotkit" in state and "actions" in state["copilotkit"]:
        frontend_actions = state["copilotkit"]["actions"]
        all_tools.extend(frontend_actions)
    
    llm_with_tools = llm.bind_tools(all_tools)
    
    sys_msg = SystemMessage(
        content="""
        You are a professional copywriting assistant skilled in persuasive sales content.
        You have access to backend tools like web scraping and search, as well as frontend actions to interact with the user interface.
        
        IMPORTANT INSTRUCTIONS FOR TOOLS:
        - When a user wants to analyze a website, use the firecrawl_scrape tool with the URL
        - When a user needs information from the web, use the tavily_search tool
        - When a user wants marketing content created, use the generate_copy tool
        - When you've created copy and want user feedback, use the review_copy tool
        - After completing a task, always provide a response to keep the conversation going.
        """
    )
    
    messages = [sys_msg] + state.get("messages", [])
    
    try:
        # Emitujeme zprávu o zpracování podle dokumentace
        await copilotkit_emit_message(config, "Zpracovávám váš požadavek...")
        response = await llm_with_tools.ainvoke(messages, config)
        
        print("LLM odpověď:", response)
        print("Tool calls:", getattr(response, 'tool_calls', None))
        print("Obsah:", response.content)
        
        # Zpracování odpovědi s voláním nástrojů
        if hasattr(response, 'tool_calls') and response.tool_calls:
            # Pro nástroj review_copy vracíme aktualizaci stavu, ostatní nástroje zpracovává tools node
            for tool_call in response.tool_calls:
                tool_name = tool_call.get('name')
                await copilotkit_emit_state(config, {
                    "tool_call": {
                        "name": tool_name,
                        "args": tool_call.get('args', {})
                    }
                })
                
                if tool_name == "review_copy":
                    state["requires_user_feedback"] = True
                    return Command(goto="tools", update={"messages": state["messages"] + [response]})
                
            return Command(goto="tools", update={"messages": state["messages"] + [response]})
        
        # Zpracování odpovědi bez volání nástrojů - ukončení zpracování
        state["isProcessing"] = False
        await copilotkit_emit_state(config, {"status": "processing_complete"})
        
        final_message = AIMessage(content=response.content or "Hotovo! Jak vám můžu dál pomoct?")
        await copilotkit_emit_message(config, final_message.content)
        await copilotkit_emit_state(config, {"status": "task_complete"})
        print("Finální zpráva odeslána:", final_message.content)
        
        # Ukončujeme zpracování
        await copilotkit_exit(config)
        return Command(goto="__end__", update={"messages": state["messages"] + [final_message]})
        
    except Exception as e:
        state["isProcessing"] = False
        error_msg = f"Chyba: {str(e)}"
        print("Chyba v tool_calling_llm:", error_msg)
        await copilotkit_emit_state(config, {"status": "error", "error_message": str(e)})
        error_message = AIMessage(content=f"Omlouvám se, došlo k chybě: {str(e)}. Co můžu udělat?")
        await copilotkit_emit_message(config, error_message.content)
        
        # Ukončujeme zpracování
        await copilotkit_exit(config)
        return Command(goto="__end__", update={"messages": state["messages"] + [error_message]})

async def feedback_node(state: CopywriterState, config: RunnableConfig):
    """
    Node pro získání a zpracování zpětné vazby od uživatele.
    Implementuje "interrupt" dle dokumentace LangGraph.
    """
    await copilotkit_emit_message(config, "Čekám na vaši zpětnou vazbu k vytvořenému copy...")
    
    # Použijeme interrupt k získání zpětné vazby od uživatele
    user_feedback = interrupt("Prosím o zpětnou vazbu k vytvořenému copy textu")
    
    # Aktualizujeme stav o zpětnou vazbu
    state["user_feedback"] = user_feedback
    state["requires_user_feedback"] = False
    
    # Přidáme zprávu o zpětné vazbě
    feedback_message = HumanMessage(content=f"Moje zpětná vazba: {user_feedback}")
    
    # Vracíme zpět do LLM node
    return Command(goto="tool_calling_llm", update={"messages": state["messages"] + [feedback_message]})

# ====== 6) DEFINICE GRAFU ======
builder = StateGraph(CopywriterState)
builder.add_node("tool_calling_llm", tool_calling_llm)
builder.add_node("tools", ToolNode(tools))
builder.add_node("feedback_node", feedback_node)

# Nastavení vstupního a výstupního bodu
builder.set_entry_point("tool_calling_llm")

# Definice hran
builder.add_conditional_edges(
    "tool_calling_llm",
    route_based_on_tools,
    {
        "tools": "tools",
        "feedback_node": "feedback_node",
        "__end__": END
    }
)
builder.add_edge("tools", "tool_calling_llm")
builder.add_edge("feedback_node", "tool_calling_llm")

# Kompilace grafu bez použití parametru initial_state
graph = builder.compile()

# ====== 7) VYTVOŘENÍ AGENTA ======
agent = LangGraphAgent(
    name="copywriter_agent",
    description="Professional copywriting assistant with web search and scraping capabilities",
    graph=graph
)