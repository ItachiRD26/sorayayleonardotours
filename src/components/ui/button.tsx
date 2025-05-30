import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-800 text-white hover:bg-primary-light shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300",
        outline: "bg-white text-primary hover:bg-theme-celeste hover:text-white transition-all duration-300 cursor-pointer",
        secondary: "bg-secondary text-white hover:bg-secondary/80 shadow-lg hover:shadow-xl transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline",
        custom: "bg-sea-light-custom text-white hover:bg-primary-light-custom shadow-lg hover:shadow-xl transition-all duration-300",
        sea: "bg-theme-sea-light text-white hover:bg-theme-celeste shadow-lg hover:shadow-xl transition-all duration-300",
        green: "bg-theme-green text-white hover:bg-theme-green-light shadow-lg hover:shadow-xl transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };