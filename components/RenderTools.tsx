import React from 'react';
import { useCopilotAction, useCoAgentStateRender } from "@copilotkit/react-core";

// Komponenta pro zobrazení logů
interface ProgressProps {
  logs: string[];
}

function Progress({ logs }: ProgressProps) {
  return (
    <div className="mt-2 p-3 border rounded-md bg-gray-50">
      <h4 className="text-sm font-medium mb-2">Průběh zpracování:</h4>
      <div className="text-xs space-y-1 max-h-40 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="text-gray-600">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// Rozšířený typ pro stav agenta
type AgentState = {
  logs?: string[];
  status?: string;
  url?: string;
  query?: string;
  prompt?: string;
  // Přidáno pro mezivýsledky
  scrape_result?: string;
  search_result?: string;
  copy_result?: string;
  resources?: Array<{url?: string, query?: string, content: string}>;
}

export function RenderTools() {
  // Implementace useCoAgentStateRender pro firecrawl_scrape
  useCoAgentStateRender<AgentState>({
    name: "firecrawl_scrape",
    render: ({ status, state, nodeName }) => {
      // Zobrazení výsledku scrapingu, pokud existuje
      if (state.scrape_result) {
        return (
          <div className="mt-2 p-3 border rounded-md bg-gray-50">
            <h4 className="text-sm font-medium mb-2">Výsledek scrapingu:</h4>
            <div className="text-xs max-h-40 overflow-y-auto">
              {state.scrape_result.length > 500 
                ? state.scrape_result.substring(0, 500) + "..." 
                : state.scrape_result}
            </div>
          </div>
        );
      }
      
      // Zobrazení zdroje, pokud existuje v resources
      if (state.resources && state.resources.length > 0) {
        const scrapeResource = state.resources.find(r => r.url);
        if (scrapeResource) {
          return (
            <div className="mt-2 p-3 border rounded-md bg-gray-50">
              <h4 className="text-sm font-medium mb-2">Získané zdroje:</h4>
              <div className="text-xs space-y-1">
                <div className="font-medium">{scrapeResource.url}</div>
                <div className="max-h-40 overflow-y-auto">
                  {scrapeResource.content.length > 500 
                    ? scrapeResource.content.substring(0, 500) + "..." 
                    : scrapeResource.content}
                </div>
              </div>
            </div>
          );
        }
      }
      
      // Původní zobrazení
      if (!state.logs || state.logs.length === 0) {
        return (
          <div className="text-gray-500 mt-2 p-3 border rounded-md bg-gray-50">
            {status !== "complete" ? "Zpracovávám webovou stránku..." :
            `Zpracoval jsem webovou stránku: ${state.url || 'URL nebyla zadána'}`}
          </div>
        );
      }
      return <Progress logs={state.logs} />;
    },
  });

  // Implementace useCoAgentStateRender pro generate_copy
  useCoAgentStateRender<AgentState>({
    name: "generate_copy",
    render: ({ status, state, nodeName }) => {
      // Zobrazení výsledku generování textu, pokud existuje
      if (state.copy_result) {
        return (
          <div className="mt-2 p-3 border rounded-md bg-gray-50">
            <h4 className="text-sm font-medium mb-2">Vygenerovaný text:</h4>
            <div className="text-xs max-h-40 overflow-y-auto">
              {state.copy_result}
            </div>
          </div>
        );
      }
      
      // Původní zobrazení
      if (!state.logs || state.logs.length === 0) {
        return (
          <div className="text-gray-500 mt-2 p-3 border rounded-md bg-gray-50">
            {status !== "complete" ? "Generuji text..." :
            `Vygeneroval jsem text na téma: ${state.prompt || 'Téma nebylo zadáno'}`}
          </div>
        );
      }
      return <Progress logs={state.logs} />;
    },
  });

  // Implementace useCoAgentStateRender pro tavily_search
  useCoAgentStateRender<AgentState>({
    name: "tavily_search",
    render: ({ status, state, nodeName }) => {
      // Zobrazení výsledku vyhledávání, pokud existuje
      if (state.search_result) {
        return (
          <div className="mt-2 p-3 border rounded-md bg-gray-50">
            <h4 className="text-sm font-medium mb-2">Výsledky vyhledávání:</h4>
            <div className="text-xs max-h-40 overflow-y-auto">
              {state.search_result.length > 500 
                ? state.search_result.substring(0, 500) + "..." 
                : state.search_result}
            </div>
          </div>
        );
      }
      
      // Zobrazení zdroje, pokud existuje v resources
      if (state.resources && state.resources.length > 0) {
        const searchResource = state.resources.find(r => r.query);
        if (searchResource) {
          return (
            <div className="mt-2 p-3 border rounded-md bg-gray-50">
              <h4 className="text-sm font-medium mb-2">Výsledky vyhledávání:</h4>
              <div className="text-xs space-y-1">
                <div className="font-medium">Dotaz: {searchResource.query}</div>
                <div className="max-h-40 overflow-y-auto">
                  {searchResource.content.length > 500 
                    ? searchResource.content.substring(0, 500) + "..." 
                    : searchResource.content}
                </div>
              </div>
            </div>
          );
        }
      }
      
      // Původní zobrazení
      if (!state.logs || state.logs.length === 0) {
        return (
          <div className="text-gray-500 mt-2 p-3 border rounded-md bg-gray-50">
            {status !== "complete" ? "Vyhledávám informace..." :
            `Vyhledal jsem informace o: ${state.query || 'Dotaz nebyl zadán'}`}
          </div>
        );
      }
      return <Progress logs={state.logs} />;
    },
  });

  // Komponenta nemusí nic vracet, protože hooks registrují akce
  return null;
}