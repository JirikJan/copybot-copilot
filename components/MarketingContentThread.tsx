import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { ContentForm } from "./ContentForm";
import { useEffect, useState } from "react";

export function MarketingContentThread() {
  const { marketingContents } = useMarketingContent();
  const [isClient, setIsClient] = useState(false);
  
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

  return (
    <main className="flex h-full flex-col items-center justify-between">
      <div className="flex h-full w-full flex-col">
        <header className="border-b px-6 py-4 bg-primary text-primary-foreground">
          <h2 className="text-2xl font-semibold">
            Marketingový obsah: Materiály kampaně
          </h2>
        </header>
        <div className="flex flex-1">
          {/* Side-by-side layout with textarea on left and content in middle */}
          <div className="flex w-full flex-row">
            {/* Left side: Content form */}
            <div className="flex w-1/3 flex-col bg-card p-4 border-r">
              <h3 className="text-lg font-medium mb-4 text-primary">Vytvořit nový příspěvek</h3>
              <ContentForm />
            </div>
            
            {/* Middle: Content list */}
            <div className="flex w-2/3 flex-col bg-muted">
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {marketingContents.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground bg-card rounded-lg p-8 shadow-sm">
                      <p className="text-lg">Zatím zde nejsou žádné marketingové texty.</p>
                      <p className="mt-2">Vytvořte svůj první marketingový text pomocí formuláře vlevo.</p>
                    </div>
                  ) : (
                    marketingContents.map((content) => (
                      <div
                        key={`${content.from}-${content.timestamp}`}
                        className="rounded-lg border bg-card p-5 space-y-2 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(content.category)}`}>
                            {content.category ? getCategoryLabel(content.category) : "Obecné"}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {/* Only render formatted dates on the client to avoid hydration mismatch */}
                            {isClient ? (
                              <>
                                {new Date(content.timestamp).toLocaleDateString()}{" "}
                                {new Date(content.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </>
                            ) : (
                              /* Use a simple ISO format on the server */
                              content.timestamp.split("T").join(" ").substring(0, 16)
                            )}
                          </p>
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 w-full">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                <span className="text-muted-foreground">Od:</span>{" "}
                                <span className="text-primary">{content.from}</span>
                              </p>
                              <p className="text-sm font-medium">
                                <span className="text-muted-foreground">Pro:</span>{" "}
                                <span className="text-primary">{content.to}</span>
                              </p>
                            </div>
                            <p className="text-sm text-foreground mt-2 whitespace-pre-wrap">
                              {content.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 