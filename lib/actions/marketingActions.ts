import { useCopilotAction } from "@copilotkit/react-core";
import { useMarketingContent } from "@/lib/hooks/use-marketing-content";

/**
 * Hook pro registraci všech akcí souvisejících s marketingovým obsahem
 */
export function useMarketingActions() {
  const { addMarketingContent, deleteMarketingContent, marketingContents } = useMarketingContent();

  // Akce pro přidávání marketingového obsahu
  useCopilotAction({
    name: "addMarketingContent",
    description: "Vytvoří nový marketingový příspěvek a umístí jej do aplikace v sekci marketingového obsahu.",
    parameters: [
      {
        name: "body",
        type: "string",
        description: "Obsah marketingového příspěvku",
        required: true,
      },
      {
        name: "category",
        type: "string",
        description: "Kategorie marketingového obsahu (blog, Instagram, Facebook, atd.)",
        required: true,
      },
    ],
    handler: async ({ body, category }) => {
      addMarketingContent({ body, category });
      return `Vytvořil jsem nový ${category} příspěvek na téma "${body.substring(0, 30)}${body.length > 30 ? '...' : ''}"`;
    },
  });
  
  // Akce pro smazání marketingového obsahu
  useCopilotAction({
    name: "deleteMarketingContent",
    description: "Smaže marketingový příspěvek ze seznamu vytvořeného obsahu. Použijte tuto akci, když chcete odstranit konkrétní příspěvek z aplikace.",
    parameters: [
      {
        name: "index",
        type: "number",
        description: "Index příspěvku, který chcete smazat (číslováno od 0)",
        required: true,
      },
    ],
    handler: async ({ index }) => {
      try {
        console.log("Deleting marketing content at index", index);
        console.log("Current marketing contents:", marketingContents);
        
        // Kontrola zda je index v rozsahu
        if (index < 0 || index >= marketingContents.length) {
          return {
            success: false,
            message: `Chyba: Index ${index} je mimo rozsah. K dispozici je ${marketingContents.length} příspěvků (indexováno od 0 do ${marketingContents.length - 1 >= 0 ? marketingContents.length - 1 : 0}).`
          };
        }
        
        // Uložení informací o mazaném příspěvku
        const deletedContent = marketingContents[index];
        const previewText = deletedContent.body.substring(0, 30) + 
                           (deletedContent.body.length > 30 ? '...' : '');
        
        // Smazání příspěvku
        deleteMarketingContent(index);
        
        console.log("Marketing content deleted, new contents:", marketingContents);
        
        // Vrácení úspěšné odpovědi
        return {
          success: true,
          message: `Příspěvek "${previewText}" byl úspěšně smazán.`,
          deletedIndex: index
        };
      } catch (error: any) {
        console.error("Chyba při mazání příspěvku:", error);
        return {
          success: false,
          message: `Chyba při mazání příspěvku: ${error.message}`
        };
      }
    },
  });
}