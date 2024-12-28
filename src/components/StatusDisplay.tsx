'use client'

import React from 'react';

interface StatusDisplayProps {
  cooldownTime: number;
}

export function StatusDisplay({ cooldownTime }: StatusDisplayProps) {
  return (
    <div className="flex items-center justify-between text-[#808080] px-2">
      <span>Status</span>
      <div className="flex items-center space-x-2">
        <span>Cooldown</span>
        <span className="text-[#00FFFF]">{cooldownTime}ms</span>
      </div>
    </div>
  );
} 