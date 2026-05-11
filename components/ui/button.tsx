import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg",
    "text-sm font-medium",
    "transition-all duration-200 ease-smooth",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-white text-bg hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)] active:translate-y-[0.5px]",
        secondary:
          "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-bg-subtle",
        ghost: "bg-transparent text-ink hover:bg-bg-subtle",
        link: "bg-transparent text-brand hover:underline underline-offset-4 px-0 py-0 h-auto rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
