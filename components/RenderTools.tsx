import React from 'react';
import { useCopilotAction } from "@copilotkit/react-core"; 

/**
 * Komponenta pro renderování externích nástrojů v UI
 * Tato komponenta neimplementuje funkčnost nástrojů, pouze zajišťuje jejich zobrazení v UI
 */
export function RenderTools() {
    // Renderování nástroje firecrawl_scrape
    useCopilotAction({
        name: "firecrawl_scrape",
        description: "Scrape a zpracuj webovou stránku",
        available: "disabled", // Zakázáno pro přímé volání, pouze pro renderování
        render: ({status, args}) => {
            return (
                <div className="text-gray-500 mt-2 p-3 border rounded-md bg-gray-50">
                    {status !== "complete" && "Zpracovávám webovou stránku..."}
                    {status === "complete" && `Zpracoval jsem webovou stránku: ${args?.url || 'URL nebyla zadána'}`}
                </div>
            );
        }
    });

    // Renderování nástroje generate_copy
    useCopilotAction({
        name: "generate_copy",
        description: "Vygeneruj text na základě zadaného promptu",
        available: "disabled", // Zakázáno pro přímé volání, pouze pro renderování
        render: ({status, args}) => {
            return (
                <div className="text-gray-500 mt-2 p-3 border rounded-md bg-gray-50">
                    {status !== "complete" && "Generuji text..."}
                    {status === "complete" && `Vygeneroval jsem text na téma: ${args?.prompt || 'Téma nebylo zadáno'}`}
                </div>
            );
        }
    });

    // Renderování nástroje tavily_search
    useCopilotAction({
        name: "tavily_search",
        description: "Vyhledej informace na webu",
        available: "disabled", // Zakázáno pro přímé volání, pouze pro renderování
        render: ({status, args}) => {
            return (
                <div className="text-gray-500 mt-2 p-3 border rounded-md bg-gray-50">
                    {status !== "complete" && "Vyhledávám informace..."}
                    {status === "complete" && `Vyhledal jsem informace o: ${args?.query || 'Dotaz nebyl zadán'}`}
                </div>
            );
        }
    });

    // Komponenta nemusí nic vracet, protože hooks registrují akce
    return null;
}