import React from 'react';
import { Button } from "./ui/button";
import { Icons } from './ui/FormElements';

interface SubmitButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function SubmitButton({ disabled, onClick }: SubmitButtonProps) {
  return (
    <Button 
      className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white font-medium py-3 rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
      disabled={disabled} 
      onClick={onClick}
    >
      {Icons.edit}
      <span>Publikovat obsah</span>
    </Button>
  );
} 