import React from 'react';
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { FormSection, Icons } from './ui/FormElements';

interface ContentTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  category: string;
}

export function ContentTextarea({ value, onChange, category }: ContentTextareaProps) {
  return (
    <FormSection id="content" label="Obsah" icon={Icons.document}>
      <div className="relative flex-grow">
        <CopilotTextarea
          id="content"
          className="min-h-[350px] flex-grow border border-border/20 p-4 overflow-hidden rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/30 bg-white shadow-sm hover:border-secondary/30 transition-all resize-none"
          value={value}
          onChange={onChange}
          placeholder="Napište svůj marketingový text..."
          autosuggestionsConfig={{
            textareaPurpose: `Pomozte mi vytvořit marketingový obsah pro ${category}. Nezapomeňte na všechny důležité detaily.`,
            chatApiConfigs: {}
          }}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/80 px-2 py-0.5 rounded-full border border-border/10">
          {value.length} znaků
        </div>
      </div>
    </FormSection>
  );
} 