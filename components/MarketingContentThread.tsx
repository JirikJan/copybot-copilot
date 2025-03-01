"use client";
import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { ContentForm } from "./ContentForm";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { motion } from "framer-motion";

export function MarketingContentThread() {
  const { marketingContents, deleteMarketingContent } = useMarketingContent();
  const [isClient, setIsClient] = useState(false);
  const [expandedContent, setExpandedContent] = useState<string | null>(null);
  
  // This effect runs only on the client after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to get category label
  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      blog: "Blog",
      instagram: "Instagram",
      facebook: "Facebook",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      newsletter: "Newsletter",
      other: "Jiné",
    };
    return categories[category] || "Jiné";
  };

  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      blog: "bg-blue-100 text-blue-800",
      instagram: "bg-purple-100 text-purple-800",
      facebook: "bg-indigo-100 text-indigo-800",
      twitter: "bg-sky-100 text-sky-800",
      linkedin: "bg-cyan-100 text-cyan-800",
      newsletter: "bg-emerald-100 text-emerald-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Toggle expanded content
  const toggleExpanded = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  // Handle delete content
  const handleDeleteContent = (index: number) => {
    console.log("Deleting content at index", index);
    deleteMarketingContent(index);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl shadow-sm border border-border/10">
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
        
        <ContentForm />
      </div>

      {isClient && marketingContents.length > 0 ? (
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {marketingContents.map((content, index) => (
              <motion.div
                key={`content-${index}`}
                className="bg-white rounded-xl shadow-sm border border-border/10 overflow-hidden hover:shadow-md hover:border-border/30 transition-all duration-200"
                variants={item}
                layout
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(content.category)}`}>
                      {getCategoryLabel(content.category)}
                    </span>
                    {isClient && content.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(content.timestamp), "d. MMMM yyyy, HH:mm", { locale: cs })}
                      </span>
                    )}
                  </div>
                  
                  <div 
                    className="prose prose-sm max-w-none cursor-pointer"
                    onClick={() => toggleExpanded(`content-${index}`)}
                  >
                    <motion.div
                      initial={false}
                      animate={{ height: expandedContent === `content-${index}` ? "auto" : "100px" }}
                      className="overflow-hidden relative"
                    >
                      <p>{content.body}</p>
                      {expandedContent !== `content-${index}` && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                      )}
                    </motion.div>
                  </div>
                  
                  <button 
                    onClick={() => toggleExpanded(`content-${index}`)}
                    className="mt-3 text-xs font-medium text-secondary hover:text-secondary/80 flex items-center transition-colors"
                  >
                    {expandedContent === `content-${index}` ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Zobrazit méně
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Zobrazit více
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-slate-50 px-5 py-3 border-t border-border/10 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Upravit
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                      </svg>
                      Sdílet
                    </button>
                  </div>
                  <button 
                    onClick={() => handleDeleteContent(index)}
                    className="text-xs text-rose-500 hover:text-rose-600 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Smazat
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-border/10">
          {isClient ? (
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary/40" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-primary mb-2">Žádný obsah</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Zatím jste nevytvořili žádný marketingový obsah. Použijte formulář výše k vytvoření nového obsahu.
              </p>
            </div>
          ) : (
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-16 w-16 bg-primary/5 rounded-full mb-4"></div>
              <div className="h-5 bg-primary/5 rounded w-48 mb-2"></div>
              <div className="h-4 bg-primary/5 rounded w-64"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 