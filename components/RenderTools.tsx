import React from 'react';
import { useCopilotAction } from "@copilotkit/react-core";

export function RenderTools() {
  // Renderování nástroje firecrawl_scrape
  useCopilotAction({
    name: "firecrawl_scrape",
    available: "disabled", // Pouze pro renderování, ne pro volání z UI
    render: ({ status, args }) => {
      return (
        <div className="mt-2 p-3 border rounded-md bg-blue-50">
          <h4 className="text-sm font-medium mb-1">Scraping webové stránky</h4>
          <div className="text-xs">
          </div>
        </div>
      );
    },
  });

  // Renderování nástroje generate_copy
  useCopilotAction({
    name: "generate_copy",
    available: "disabled", // Pouze pro renderování, ne pro volání z UI
    render: ({ status, args }) => {
      return (
        <div className="mt-2 p-3 border rounded-md bg-green-50">
          <h4 className="text-sm font-medium mb-1">Generování marketingového obsahu</h4>
          <div className="text-xs">
            {status === "complete" && (
              <div>
                <span className="text-green-600">✓</span> Obsah vytvořen pro:
                <ul className="mt-1 ml-4 list-disc">
                  <li>Produkt: {args?.product || "Nespecifikováno"}</li>
                  <li>Cílová skupina: {args?.audience || "Nespecifikováno"}</li>
                  <li>Tón komunikace: {args?.tone || "Přesvědčivý"}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    },
  });

  // Renderování nástroje tavily_search
  useCopilotAction({
    name: "tavily_search",
    available: "disabled", // Pouze pro renderování, ne pro volání z UI
    render: ({ status, args }) => {
      return (
        <div className="mt-2 p-3 border rounded-md bg-purple-50">
            {status === "complete" && (
              <div>
                <span className="text-green-600">✓</span> Vyhledávání dokončeno: {args?.query || ""}
              </div>
            )}
          </div>
      );
    },
  });

 

  // Komponenta nemusí nic vracet, protože hooks registrují samostatné renderery
  return null;
}

export default RenderTools;