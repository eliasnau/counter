'use client'

import React from 'react';

type CooldownBarProps = {
  isActive: boolean
}

export function CooldownBar({ isActive }: CooldownBarProps) {
  return (
    <div className="w-full h-[1px] bg-white/[0.04] overflow-hidden">
      <div 
        className={`
          h-full bg-[#00FFFF] origin-left transition-none
          ${isActive ? 'animate-cooldown-down' : 'scale-x-1'}
        `}
      />
    </div>
  )
} 