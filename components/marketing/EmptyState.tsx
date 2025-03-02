import React from 'react';

interface EmptyStateProps {
  isClient: boolean;
}

export function EmptyState({ isClient }: EmptyStateProps) {
  if (!isClient) {
    return (
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-16 w-16 bg-primary/5 rounded-full mb-4"></div>
        <div className="h-5 bg-primary/5 rounded w-48 mb-2"></div>
        <div className="h-4 bg-primary/5 rounded w-64"></div>
      </div>
    );
  }

  return (
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
  );
} 