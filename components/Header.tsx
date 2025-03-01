import React from 'react';

export function Header() {
  return (
    <header className="w-full bg-white border-b border-[#0F133F]/20 shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0F133F] to-[#0F133F]/80 flex items-center justify-center text-white font-bold">M</div>
        <h1 className="text-xl font-semibold text-[#0F133F]">Copybot Agent</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="px-3 py-1.5 rounded-full bg-[#0F133F]/10 text-xs font-medium text-[#0F133F] flex items-center">
          <span className="h-2 w-2 rounded-full bg-[#0F133F] mr-2"></span>
          Aktivní
        </div>
      </div>
    </header>
  );
} 