"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";
import { useMarketingContent } from "@/lib/hooks/use-marketing-content";

export function CopilotSidebar() {
  const { addMarketingContent } = useMarketingContent();

  useCopilotAction({
    name: "createMarketingContent",
    description: "Create marketing content based on the topic, category, and length",
    parameters: [
      {
        name: "topic",
        type: "string",
        description: "The topic of the marketing content",
        required: true,
      },
      {
        name: "category",
        type: "string",
        description: "The category of the marketing content (blog, instagram, facebook, twitter, linkedin, newsletter, other)",
        required: true,
      },
      {
        name: "length",
        type: "string",
        description: "The length of the marketing content (short, medium, long)",
        required: true,
      },
    ],
    handler: async ({ topic, category, length }) => {
      console.log("Creating marketing content", { topic, category, length });
      
      // Simulate API call to generate content
      const contentLengths = {
        short: 100,
        medium: 250,
        long: 500,
      };
      
      const lengthInChars = contentLengths[length as keyof typeof contentLengths] || 250;
      
      // Add the marketing content
      addMarketingContent({
        body: `Marketingový obsah na téma "${topic}" pro platformu ${category}. Délka: ${length}.`,
        category: category as string,
      });
      
      return `Vytvořil jsem nový ${category} příspěvek na téma "${topic}" s délkou "${length}".`;
    },
  });

  const EmptyState = (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-primary mb-2">Váš marketingový asistent</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Jsem zde, abych vám pomohl s vytvářením marketingového obsahu. Můžete se mě zeptat na cokoliv ohledně marketingu nebo mě požádat o vytvoření obsahu.
      </p>
      <div className="space-y-2 w-full">
        <div className="bg-white p-3 rounded-lg border border-border/20 text-sm cursor-pointer hover:bg-accent/5 transition-colors">
          "Vytvoř mi blogový příspěvek o udržitelném marketingu"
        </div>
        <div className="bg-white p-3 rounded-lg border border-border/20 text-sm cursor-pointer hover:bg-accent/5 transition-colors">
          "Potřebuji Instagram post o nových trendech v e-commerce"
        </div>
        <div className="bg-white p-3 rounded-lg border border-border/20 text-sm cursor-pointer hover:bg-accent/5 transition-colors">
          "Jak optimalizovat LinkedIn profil pro B2B marketing?"
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-slate-50 border-l border-border/20 shadow-sm">
      <div className="p-4 border-b border-border/20 bg-white">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">Marketing Asistent</h3>
            <p className="text-xs text-muted-foreground">Připraven pomoci</p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-hidden">
        <CopilotChat
          className="h-full"
          instructions="Jsi marketingový asistent, který pomáhá s vytvářením obsahu pro různé platformy. Odpovídej v češtině."
        >
          {EmptyState}
        </CopilotChat>
      </div>
    </div>
  );
} 