import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormSection, Icons } from './ui/FormElements';

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <FormSection id="category" label="Kategorie obsahu" icon={Icons.chat}>
      <Select value={value} onValueChange={onChange}>
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
          <SelectItem value="all" className="hover:bg-accent/10 rounded-md transition-colors">Draft mailingové kampaně</SelectItem>
        </SelectContent>
      </Select>
    </FormSection>
  );
} 