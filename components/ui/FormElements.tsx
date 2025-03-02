import React from 'react';
import { Label } from "./label";

interface FormSectionProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function FormSection({ id, label, icon, children }: FormSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 mb-1">
        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <Label htmlFor={id} className="text-sm font-medium text-primary">{label}</Label>
      </div>
      {children}
    </div>
  );
}

export const Icons = {
  chat: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
    </svg>
  ),
  document: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
  edit: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
  )
}; 