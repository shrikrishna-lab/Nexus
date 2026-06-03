import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "panel" | "danger";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md" | "icon" }>(
  ({ className, variant = "panel", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-md border transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "border-violet-400/50 bg-violet-600 text-white shadow-glow hover:bg-violet-500",
        variant === "ghost" && "border-transparent bg-transparent text-white/70 hover:bg-white/8 hover:text-white",
        variant === "panel" && "border-white/10 bg-white/[0.05] text-white/82 hover:border-white/18 hover:bg-white/[0.08]",
        variant === "danger" && "border-rose-400/30 bg-rose-500/12 text-rose-100 hover:bg-rose-500/18",
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-10 px-4 text-sm",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
