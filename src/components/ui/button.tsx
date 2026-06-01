"use client";

import * as React from "react";
import { Slot } from "@/components/ui/slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-container text-on-primary shadow-sm hover:shadow-md hover:brightness-110 dark:bg-secondary dark:text-on-secondary",
        secondary:
          "bg-secondary text-on-secondary shadow-sm hover:brightness-110",
        outline:
          "border border-outline-variant bg-surface text-on-surface hover:bg-surface-low",
        ghost: "text-secondary hover:bg-secondary/10",
        subtle: "bg-surface-container text-on-surface hover:bg-surface-high",
        destructive: "bg-error text-on-error-container/0 text-white hover:brightness-110",
        glass:
          "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20",
      },
      size: {
        sm: "h-9 px-3 text-[13px]",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
