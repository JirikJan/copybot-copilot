import React from 'react';

interface CreatedContentListProps {
  contents: string[];
  onDelete: (index: number) => void;
}

export function CreatedContentList({ contents, onDelete }: CreatedContentListProps) {
  if (contents.length === 0) return null;
  
  return (
    <div className="mt-5 p-5 rounded-xl bg-white shadow-md border border-[#0F133F]/20 max-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-[#0F133F]/10 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#0F133F]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-medium text-[#0F133F]">Vytvořený obsah pomocí agenta</h3>
        </div>
        <div className="text-sm text-[#0F133F]/70">
          {contents.length} {contents.length === 1 ? 'příspěvek' : contents.length >= 2 && contents.length <= 4 ? 'příspěvky' : 'příspěvků'}
        </div>
      </div>
      <div className="space-y-3 overflow-y-auto flex-grow pr-2" style={{ overflowY: 'auto', maxHeight: '220px' }}>
        {contents.map((content, index) => (
          <div key={index} className="p-3 bg-[#0F133F]/5 rounded-lg border border-[#0F133F]/20 hover:shadow-sm transition-all group">
            <div className="flex justify-between items-start">
              <p className="text-sm text-[#0F133F] flex-grow">
                <span className="font-medium text-xs text-[#0F133F]/60 mr-1">[{index}]</span> 
                {content}
              </p>
              <button 
                onClick={() => onDelete(index)}
                className="ml-2 p-1.5 rounded-full text-red-500 hover:text-white hover:bg-red-500 transition-colors"
                aria-label="Smazat obsah"
                title="Smazat příspěvek"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 