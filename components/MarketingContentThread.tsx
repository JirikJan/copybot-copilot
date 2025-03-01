import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { ContentForm } from "./ContentForm";
import { useEffect, useState } from "react";

export function MarketingContentThread() {
  const { marketingContents } = useMarketingContent();
  const [isClient, setIsClient] = useState(false);
  const [expandedContent, setExpandedContent] = useState<string | null>(null);
  
  // This effect runs only on the client after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to get category label
  const getCategoryLabel = (category: string) => {
    const categories = {
      blog: "Blog",
      instagram: "Instagram",
      facebook: "Facebook",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      newsletter: "Newsletter",
      other: "Jiné"
    };
    return categories[category as keyof typeof categories] || category;
  };

  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      blog: "bg-blue-100 text-blue-800",
      instagram: "bg-pink-100 text-pink-800",
      facebook: "bg-indigo-100 text-indigo-800",
      twitter: "bg-sky-100 text-sky-800",
      linkedin: "bg-blue-100 text-blue-800",
      newsletter: "bg-amber-100 text-amber-800",
      other: "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Toggle expanded content
  const toggleExpand = (id: string) => {
    if (expandedContent === id) {
      setExpandedContent(null);
    } else {
      setExpandedContent(id);
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-between marketing-assistant">
      <div className="flex h-full w-full flex-col">
        <header className="border-b px-6 py-4 header-container">
          <h2 className="text-2xl font-semibold">
            Marketingový obsah: Materiály kampaně
          </h2>
        </header>
        <div className="flex flex-1">
          {/* Side-by-side layout with textarea on left and content in middle */}
          <div className="flex w-full flex-row">
            {/* Left side: Content form */}
            <div className="flex w-1/3 flex-col p-5 border-r form-container">
              <h3 className="text-lg font-medium mb-4 text-primary">Vytvořit nový příspěvek</h3>
              <ContentForm />
            </div>
            
            {/* Middle: Content list */}
            <div className="flex w-2/3 flex-col content-container">
              <div className="flex-1 overflow-y-auto p-5">
                {marketingContents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-white rounded-xl p-8 shadow-sm border border-border/20">
                    <p className="text-lg font-medium">Zatím zde nejsou žádné marketingové texty.</p>
                    <p className="mt-2 text-muted-foreground">Vytvořte svůj první marketingový text pomocí formuláře vlevo.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {marketingContents.map((content) => {
                      const contentId = `${content.from}-${content.timestamp}`;
                      const isExpanded = expandedContent === contentId;
                      
                      return (
                        <div
                          key={contentId}
                          className="content-card p-4 space-y-2 cursor-pointer hover:border-secondary/50 transition-all"
                          onClick={() => toggleExpand(contentId)}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`category-badge ${getCategoryColor(content.category)}`}>
                              {content.category ? getCategoryLabel(content.category) : "Obecné"}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {isClient && new Date(content.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">
                                <span className="text-muted-foreground">Od:</span>{" "}
                                <span className="text-primary">{content.from}</span>
                              </p>
                            </div>
                            
                            <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96' : 'max-h-16'}`}>
                              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                                {isExpanded ? content.body : truncateText(content.body, 100)}
                              </p>
                            </div>
                            
                            {content.body.length > 100 && (
                              <button 
                                className="text-xs text-secondary font-medium hover:text-secondary/80 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExpand(contentId);
                                }}
                              >
                                {isExpanded ? 'Zobrazit méně' : 'Zobrazit více'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 