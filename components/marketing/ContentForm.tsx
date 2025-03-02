import React, { useState } from 'react';
import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { CopilotTextarea } from "@copilotkit/react-textarea";

export function ContentForm() {
  const { addMarketingContent } = useMarketingContent();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("blog");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Zpracování odeslání formuláře
   */
  const handleSubmit = () => {
    if (!input.trim()) return;
    
    setIsSubmitting(true);
    
    // Přidání nového obsahu
    addMarketingContent({
      body: input,
      category: category
    });
    
    // Reset formuláře
    setInput("");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="category"
        >
          Kategorie
        </label>
        <select
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="blog">Blog</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
          <option value="newsletter">Newsletter</option>
          <option value="other">Jiné</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="content"
        >
          Obsah
        </label>
        <div className="relative">
          <CopilotTextarea
            id="content"
            className="min-h-[200px] w-full border border-border/20 p-4 overflow-hidden rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/30 bg-white shadow-sm hover:border-secondary/30 transition-all resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Napište svůj marketingový text..."
            autosuggestionsConfig={{
              textareaPurpose: `Pomozte mi vytvořit marketingový obsah pro ${category}. Nezapomeňte na všechny důležité detaily.`,
              chatApiConfigs: {}
            }}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/80 px-2 py-0.5 rounded-full border border-border/10">
            {input.length} znaků
          </div>
        </div>
      </div>
      
      <button
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
        onClick={handleSubmit}
        disabled={!input.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Ukládám...
          </>
        ) : (
          "Vytvořit obsah"
        )}
      </button>
    </div>
  );
} 