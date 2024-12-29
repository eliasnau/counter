import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'default',
  size = 'default',
  loading = false,
  disabled,
  children,
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-mono text-sm transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1c1c1c]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF]/20 hover:bg-[#00FFFF]/20': 
            variant === 'default',
          'bg-transparent border border-white/[0.04] text-neutral-400 hover:text-neutral-200 hover:border-white/[0.08]': 
            variant === 'outline',
          'bg-transparent text-neutral-400 hover:text-neutral-200': 
            variant === 'ghost',
          'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20': 
            variant === 'destructive',
          'px-4 py-2': size === 'default',
          'px-3 py-1.5 text-xs': size === 'sm',
          'px-6 py-3': size === 'lg',
        },
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button, type ButtonProps }; 