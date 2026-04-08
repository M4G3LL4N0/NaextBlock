import * as React from "react"
import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-150 ease-in-out",
        secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700 transition-all duration-150 ease-in-out",
        ghost: "hover:bg-gray-800 hover:text-white transition-all duration-150 ease-in-out"
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export type ButtonVariant = "primary" | "secondary" | "ghost"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "div" : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonVariant, ButtonProps, VariantProps }
