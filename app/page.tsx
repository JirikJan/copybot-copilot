"use client";

import { MarketingContentThread } from "@/components/MarketingContentThread";
import { MarketingContentProvider } from "@/lib/hooks/use-marketing-content";
import "@copilotkit/react-textarea/styles.css";
import "@copilotkit/react-ui/styles.css";
import { Inter } from 'next/font/google';
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [write, setWrite] = useState<string[]>([]);

  // Definice Copilot akce pro přidání marketingového obsahu
  useCopilotAction({
    name: "writeMarketingContent",
    description: "Vytvoří nový marketingový obsah podle zadaného tématu a kategorie",
    available: "frontend", // zajistí, že akce nebude předána jako nástroj agentovi
    parameters: [
      {
        name: "topic",
        type: "string",
        description: "Téma marketingového obsahu",
        required: true,
      },
      {
        name: "category",
        type: "string",
        description: "Kategorie obsahu (blog, instagram, facebook, twitter, linkedin, newsletter, other)",
        required: true,
      },
      {
        name: "length",
        type: "string",
        description: "Délka obsahu (krátký, střední, dlouhý)",
        required: false,
      }
    ],
    handler: async ({ topic, category, length }) => {
      const newContent = `Nový ${length || 'střední'} marketingový obsah na téma "${topic}" pro kategorii "${category}"`;
      setWrite([...write, newContent]);
      return `Vytvořen nový marketingový obsah pro kategorii ${category}`;
    },
  });
  
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-white to-accent/10">
      {/* Moderní navigační lišta */}
      <header className="w-full bg-white border-b border-border/10 shadow-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">M</div>
          <h1 className="text-xl font-semibold text-primary">MarketingAI Studio</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-3 py-1.5 rounded-full bg-accent/20 text-xs font-medium text-primary flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            AI Asistent aktivní
          </div>
        </div>
      </header>
      
      {/* Hlavní obsah */}
      <div className="flex-1 flex overflow-hidden">
        {/* Levá část - obsah */}
        <div className="w-2/3 h-full overflow-auto p-5">
          <div className="bg-white rounded-xl shadow-md border border-border/10 overflow-hidden h-full flex flex-col">
            <MarketingContentProvider>
              <MarketingContentThread />
            </MarketingContentProvider>
          </div>
          
          {/* Zobrazení vytvořeného obsahu */}
          {write.length > 0 && (
            <div className="mt-5 p-5 rounded-xl bg-white shadow-md border border-border/10">
              <div className="flex items-center mb-3">
                <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary">Vytvořený obsah pomocí agenta</h3>
              </div>
              <div className="space-y-3">
                {write.map((content, index) => (
                  <div key={index} className="p-3 bg-accent/10 rounded-lg border border-accent/20 hover:shadow-sm transition-all">
                    <p className="text-sm text-foreground">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Pravá část - asistent */}
        <div className="w-1/3 h-full p-5">
          <div className="bg-white rounded-xl shadow-md border border-border/10 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4">
              <div className="flex items-center space-x-2 mb-1">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="font-semibold">Marketingový asistent</h2>
              </div>
              <p className="text-xs text-white/80">Váš osobní AI asistent pro tvorbu marketingového obsahu</p>
            </div>
            <CopilotSidebar
              labels={{
                title: "Marketingový asistent",
                initial: "Ahoj! 👋 Jak vám mohu dnes pomoci s marketingovým obsahem?",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

