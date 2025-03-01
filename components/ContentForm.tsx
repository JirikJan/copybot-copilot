"use client";

import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "./ui/label";

export function ContentForm() {
  const { addMarketingContent } = useMarketingContent();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("blog");

  const handleSubmit = () => {
    console.log(input, category);
    addMarketingContent({
      body: input,
      category: category
    });
    setInput("");
  };

  return (
    <div className="space-y-5 h-full flex flex-col">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 mb-1">
          <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <Label htmlFor="category" className="text-sm font-medium text-primary">Kategorie obsahu</Label>
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger 
            id="category" 
            className="border border-border/20 focus:border-secondary focus:ring-1 focus:ring-secondary/30 bg-white rounded-lg shadow-sm hover:border-secondary/30 transition-all"
          >
            <SelectValue placeholder="Vyberte kategorii" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-border/20 shadow-md rounded-lg">
            <SelectItem value="blog" className="hover:bg-accent/10 rounded-md transition-colors">Blog</SelectItem>
            <SelectItem value="instagram" className="hover:bg-accent/10 rounded-md transition-colors">Instagram</SelectItem>
            <SelectItem value="facebook" className="hover:bg-accent/10 rounded-md transition-colors">Facebook</SelectItem>
            <SelectItem value="twitter" className="hover:bg-accent/10 rounded-md transition-colors">Twitter</SelectItem>
            <SelectItem value="linkedin" className="hover:bg-accent/10 rounded-md transition-colors">LinkedIn</SelectItem>
            <SelectItem value="newsletter" className="hover:bg-accent/10 rounded-md transition-colors">Newsletter</SelectItem>
            <SelectItem value="other" className="hover:bg-accent/10 rounded-md transition-colors">Jiné</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-grow flex flex-col">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-4 w-4 rounded-full bg-secondary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <Label htmlFor="content" className="text-sm font-medium text-primary">Obsah</Label>
        </div>
        <div className="relative flex-grow">
          <CopilotTextarea
            id="content"
            className="min-h-[350px] flex-grow border border-border/20 p-4 overflow-hidden rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/30 bg-white shadow-sm hover:border-secondary/30 transition-all resize-none"
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
      
      <Button 
        className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white font-medium py-3 rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
        disabled={!input} 
        onClick={handleSubmit}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
        <span>Publikovat obsah</span>
      </Button>
    </div>
  );
} 