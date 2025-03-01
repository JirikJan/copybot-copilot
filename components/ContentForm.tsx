"use client";

import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { ContentTextarea } from "./ContentTextarea";
import { SubmitButton } from "./SubmitButton";

/**
 * Formulář pro vytváření marketingového obsahu
 */
export function ContentForm() {
  const { addMarketingContent } = useMarketingContent();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("blog");

  /**
   * Zpracování odeslání formuláře
   */
  const handleSubmit = () => {
    if (!input.trim()) return;
    
    addMarketingContent({
      body: input,
      category: category
    });
    
    setInput("");
  };

  return (
    <div className="space-y-5 h-full flex flex-col">
      <CategorySelector 
        value={category} 
        onChange={setCategory} 
      />
      
      <div className="flex-grow flex flex-col">
        <ContentTextarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          category={category} 
        />
      </div>
      
      <SubmitButton 
        disabled={!input.trim()} 
        onClick={handleSubmit} 
      />
    </div>
  );
} 