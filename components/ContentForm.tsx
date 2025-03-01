import { useMarketingContent } from "@/lib/hooks/use-marketing-content";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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
        <Label htmlFor="category" className="text-sm font-medium">Kategorie obsahu</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="border-secondary/50 focus:border-secondary">
            <SelectValue placeholder="Vyberte kategorii" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blog">Blog</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="newsletter">Newsletter</SelectItem>
            <SelectItem value="other">Jiné</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-grow flex flex-col">
        <Label htmlFor="content" className="text-sm font-medium mb-2">Obsah</Label>
        <CopilotTextarea
          id="content"
          className="min-h-[350px] flex-grow border p-3 overflow-hidden rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napište svůj marketingový text..."
          autosuggestionsConfig={{
            textareaPurpose: `Pomozte mi vytvořit marketingový obsah pro ${category}. Nezapomeňte na všechny důležité detaily.`,
            chatApiConfigs: {}
          }}
        />
      </div>
      
      <Button 
        className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-2"
        disabled={!input} 
        onClick={handleSubmit}
      >
        Odeslat
      </Button>
    </div>
  );
} 