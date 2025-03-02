from copilotkit import LangGraphAgent
 
LangGraphAgent(
    name="firecrawl_scrape",
    description="Anylyzuje webové stránky",
    graph=graph,
    langgraph_config=config,
)

