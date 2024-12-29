'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from './ToastProvider';

interface CodeProps {
  code: string;
  language?: string;
  showCopy?: boolean;
}

export function Code({ code, language, showCopy = true }: CodeProps) {
  const { showToast } = useToast();
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(code);
      showToast('Copied to clipboard!', 'success');
      setCopied(true);
    } catch (error) {
      showToast('Failed to copy to clipboard', 'error');
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="bg-[#1c1c1c] rounded-xl border border-white/[0.04] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
        <span className="font-mono text-xs text-neutral-400">{language || 'Code'}</span>
        {showCopy && (
          <button
            onClick={copyToClipboard}
            disabled={copying}
            className={`flex items-center gap-1 px-2 py-1 rounded-md
                     text-xs font-mono transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${copied 
                       ? 'text-emerald-500' 
                       : 'text-neutral-400 hover:text-neutral-200'
                     }`}
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copying ? 'Copying...' : copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      <div className="p-4 overflow-x-auto">
        <code className="font-mono text-sm text-neutral-200">
          {code}
        </code>
      </div>
    </div>
  );
} 