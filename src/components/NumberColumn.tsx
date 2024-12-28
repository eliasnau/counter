'use client'

import React from 'react';

interface NumberColumnProps {
  digit: string;
}

export function NumberColumn({ digit }: NumberColumnProps) {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const currentIndex = numbers.indexOf(digit);

  return (
    <div className="relative w-12 h-16 overflow-hidden bg-[#1c1c1c] rounded-lg border border-white/[0.04]">
      <div 
        className="absolute inset-0 w-full transition-transform duration-500 ease-out"
        style={{ 
          transform: `translateY(-${currentIndex * 64}px)`,
        }}
      >
        {numbers.map((num) => (
          <div 
            key={num} 
            className="h-16 w-full flex items-center justify-center text-3xl font-mono text-[#00FFFF]"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
} 