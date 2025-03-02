import React, { useState, useCallback } from 'react';
import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { CreatedContentList } from "@/components/CreatedContentList";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { RenderTools } from "@/components/RenderTools";
import { MarketingContentThread } from "@/components/marketing/MarketingContentThread";
import { ContentForm } from "@/components/marketing/ContentForm";

export function MainContent() {
  const { marketingContents, deleteMarketingContent } = useMarketingContent();
  const [write, setWrite] = useState<string[]>([]);
  
  // Funkce pro mazání příspěvků pomocí tlačítka
  const handleDeleteContent = useCallback((index: number) => {
    if (index < 0 || index >= write.length) {
      console.error(`Chyba: Index ${index} je mimo rozsah. K dispozici je ${write.length} příspěvků.`);
      return;
    }
    
    // Smazání příspěvku z lokálního stavu
    setWrite(prevWrite => {
      const newWrite = [...prevWrite];
      newWrite.splice(index, 1);
      return newWrite;
    });
    
    // Smazání příspěvku z marketingového obsahu
    deleteMarketingContent(index);
  }, [write.length, deleteMarketingContent]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Levá část - obsah */}
      <div className="w-2/3 h-full overflow-hidden p-5 flex flex-col">
        <div className="bg-white rounded-xl shadow-md border border-[#0F133F]/20 overflow-hidden flex-grow flex flex-col">
          <div className="space-y-8 w-full max-w-4xl mx-auto p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Marketingový obsah</h2>
                <p className="text-sm text-muted-foreground">Vytvořte a spravujte svůj marketingový obsah</p>
              </div>
            </div>
            
            {/* Formulář pro vytváření obsahu */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl shadow-sm border border-border/10">
              <ContentForm />
            </div>
            
            {/* Seznam vytvořeného obsahu */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Vytvořený obsah</h3>
              <MarketingContentThread 
                marketingContents={marketingContents}
                handleDeleteContent={handleDeleteContent}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Pravá část - asistent */}
      <div className="w-1/3 h-full p-5">
        <CopilotSidebar
          labels={{
            title: "Marketingový asistent",
            initial: "Ahoj! 👋 Jak vám mohu dnes pomoci s marketingovým obsahem?",
          }}
        />
        {/* Renderování nástrojů pro UI */}
        {/* <RenderTools /> */}
      </div>
    </div>
  );
} 