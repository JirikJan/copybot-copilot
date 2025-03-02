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

/**
 * Komponenta pro renderování externích nástrojů v UI
 * Tato komponenta neimplementuje funkčnost nástrojů, pouze zajišťuje jejich zobrazení v UI
 */
export function RenderTools() {
  // Definice typu pro stav agenta
  type AgentState = {
    logs: string[];
    status?: string;
    url?: string;
    query?: string;
    prompt?: string;
  }

  // Implementace useCoAgentStateRender pro firecrawl_scrape
  useCoAgentStateRender<AgentState>({
    name: "firecrawl_scrape",
    render: ({ status, state, nodeName }) => {
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