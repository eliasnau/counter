'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  buttons?: React.ReactNode;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  icon: Icon,
  iconColor = '#00FFFF',
  children,
  buttons
}: DialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1c1c1c] rounded-xl border border-white/[0.04] p-6 w-full max-w-md
                      shadow-xl relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-5 h-5" style={{ color: iconColor }} />}
                  <h2 className="font-mono text-lg text-neutral-200">{title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 py-4">
                {children}
              </div>

              {buttons && (
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.04]">
                  {buttons}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 