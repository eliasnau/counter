'use client'

import React from 'react';
import { Plus } from 'lucide-react';

interface IncrementButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function IncrementButton({ onClick, disabled }: IncrementButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-xl flex items-center justify-center space-x-2 text-lg
        ${disabled 
          ? 'bg-[#1c1c1c] text-[#404040] cursor-not-allowed border border-white/[0.04]' 
          : 'bg-[#1c1c1c] text-[#00FFFF] hover:bg-[#252525] border border-white/[0.04]'
        } transition-colors duration-200`}
    >
      <Plus size={20} />
      <span>1</span>
    </button>
  );
} 