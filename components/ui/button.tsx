import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

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
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(( 
  { className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  })
Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonVariant, ButtonProps }
