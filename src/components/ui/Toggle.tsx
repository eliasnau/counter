'use client';

import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange?: () => void;
  className?: string;
}

export function Toggle({ checked, onChange, className = '' }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className={`w-9 h-5 rounded-full transition-colors relative
                 ${checked ? 'bg-[#00FFFF]/20' : 'bg-neutral-800'}
                 ${className}`}
    >
      <motion.div
        initial={false}
        animate={{
          right: checked ? '4px' : 'auto',
          left: checked ? 'auto' : '4px',
          backgroundColor: checked ? '#00FFFF' : '#9CA3AF'
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-3 h-3 rounded-full"
      />
    </button>
  );
} 