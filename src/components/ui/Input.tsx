'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, type = 'text', ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
        {icon}
      </div>
      
      <input
        type={showPassword ? 'text' : type}
        {...props}
        className={`w-full bg-black/20 rounded-lg border border-white/[0.04] 
                   ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 
                   font-mono text-sm text-neutral-200 
                   focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50 focus:border-[#00FFFF]/50
                   transition-colors group-hover:border-white/[0.08]`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400
                     hover:text-neutral-200 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}
      
      <div className="absolute inset-0 bg-[#00FFFF]/5 opacity-0 
                    group-hover:opacity-100 rounded-lg transition-opacity 
                    pointer-events-none" />
    </div>
  );
} 