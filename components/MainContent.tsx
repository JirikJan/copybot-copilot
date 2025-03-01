import React, { useState, useCallback } from 'react';
import { MarketingContentThread } from "@/components/MarketingContentThread";
import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { CreatedContentList } from "@/components/CreatedContentList";
import { CopilotSidebar } from "@copilotkit/react-ui";

export function MainContent() {
  const { deleteMarketingContent } = useMarketingContent();
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
          <MarketingContentThread />
        </div>
        
        {/* Zobrazení vytvořeného obsahu */}
        <CreatedContentList contents={write} onDelete={handleDeleteContent} />
      </div>
      
      {/* Pravá část - asistent */}
      <div className="w-1/3 h-full p-5">
        <CopilotSidebar
          labels={{
            title: "Marketingový asistent",
            initial: "Ahoj! 👋 Jak vám mohu dnes pomoci s marketingovým obsahem?",
          }}
        />
      </div>
    </div>
  );
} 