import React from 'react';
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { CategoryBadge } from './CategoryBadge';

interface ContentCardProps {
  content: {
    body: string;
    category: string;
    timestamp?: string;
  };
  index: number;
  expandedContent: string | null;
  toggleExpanded: (contentId: string) => void;
  handleDeleteContent: (index: number) => void;
  isClient: boolean;
}

export function ContentCard({ 
  content, 
  index, 
  expandedContent, 
  toggleExpanded, 
  handleDeleteContent,
  isClient 
}: ContentCardProps) {
  const contentId = `content-${index}`;
  const isExpanded = expandedContent === contentId;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-border/10 overflow-hidden hover:shadow-md hover:border-border/30 transition-all duration-200"
      layout
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <CategoryBadge category={content.category} />
          {isClient && content.timestamp && (
            <span className="text-xs text-muted-foreground">
              {format(new Date(content.timestamp), "d. MMMM yyyy, HH:mm", { locale: cs })}
            </span>
          )}
        </div>
        
        <div 
          className="prose prose-sm max-w-none cursor-pointer"
          onClick={() => toggleExpanded(contentId)}
        >
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "100px" }}
            className="overflow-hidden relative"
          >
            <p>{content.body}</p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
            )}
          </motion.div>
        </div>
        
        <button 
          onClick={() => toggleExpanded(contentId)}
          className="mt-3 text-xs font-medium text-secondary hover:text-secondary/80 flex items-center transition-colors"
        >
          {isExpanded ? (
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
  );
} 