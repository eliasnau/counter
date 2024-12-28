'use client'

import { JetBrains_Mono } from "next/font/google";
import { Users } from 'lucide-react';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface PoweredByBadgeProps {
  type: 'powered' | 'partners';
}

export function PoweredByBadge({ type }: PoweredByBadgeProps) {
  if (type === 'partners') {
    return (
      <a
        href="/partners"
        className={`${jetbrainsMono.className} fixed bottom-4 right-4 px-3 py-2 bg-[#1c1c1c] rounded-lg border border-white/[0.04] 
                 flex items-center gap-2 hover:bg-[#252525] hover:border-[#00FFFF]/10
                 transition-all duration-200 group shadow-lg backdrop-blur-sm
                 transform-gpu hover:translate-y-[-2px]`}
      >
        <Users size={14} className="text-[#00FFFF]" />
        <span className="text-xs text-neutral-400 group-hover:text-neutral-300">
          Partner Sites
        </span>
      </a>
    );
  }

  return (
    <a
      href="https://counterclick.eliasnau.dev"
      target="_blank"
      rel="noopener noreferrer"
      className={`${jetbrainsMono.className} fixed bottom-4 right-4 px-3 py-2 bg-[#1c1c1c] rounded-lg border border-white/[0.04] 
               flex items-center gap-2 hover:bg-[#252525] hover:border-[#00FFFF]/10
               transition-all duration-200 group shadow-lg backdrop-blur-sm
               transform-gpu hover:translate-y-[-2px]`}
    >
      <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse 
                    group-hover:animate-[pulse_0.75s_ease-in-out_infinite]" />
      <span className="text-xs text-neutral-400 group-hover:text-neutral-300">
        Powered by <span className="text-[#00FFFF] group-hover:text-[#40FFFF]">CounterClick</span>
      </span>
    </a>
  );
} 