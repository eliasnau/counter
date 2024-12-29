import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
  children: React.ReactNode;
}

export function Badge({ 
  variant = "default", 
  className, 
  children,
  ...props 
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-mono transition-colors",
        variant === "default" && "bg-white/[0.04] text-neutral-400",
        variant === "outline" && "border bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}