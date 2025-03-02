import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSuggestionAccept?: (suggestion: string) => void;
  suggestion?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, suggestion, onSuggestionAccept, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Pokud je k dispozici návrh a uživatel stiskne Tab
      if (suggestion && e.key === 'Tab') {
        e.preventDefault(); // Zabrání standardnímu chování tabulátoru
        onSuggestionAccept?.(suggestion);
      }
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
