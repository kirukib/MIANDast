import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.08em] transition-[background,box-shadow,transform,color] duration-150 ease-[var(--ease-out)] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-11 md:min-h-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-[#262626] dark:hover:bg-[#d4d4d4] hover:shadow-[0_1px_0_var(--border-strong)] active:translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:border-border-strong hover:shadow-[0_1px_0_var(--border-strong)] active:translate-y-px",
        ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
        link: "bg-transparent text-foreground underline-offset-4 hover:underline px-0",
        "outline-invert":
          "bg-transparent text-foreground border border-border-strong hover:bg-secondary",
        block:
          "bg-primary text-primary-foreground rounded-none w-full h-14 hover:bg-[#262626] dark:hover:bg-[#d4d4d4]",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-5",
        block: "h-14 px-5",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
