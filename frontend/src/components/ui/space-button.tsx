/* eslint-disable react-refresh/only-export-components */import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spaceButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "shadow transition-all duration-300",
        outline:
          "border-2 border-[#00BFA5] bg-transparent text-[#5eead4] shadow-sm hover:bg-[rgba(0,191,165,0.1)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SpaceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof spaceButtonVariants> {
  asChild?: boolean
}

const SpaceButton = React.forwardRef<HTMLButtonElement, SpaceButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const defaultStyle = variant === "default" ? {
      background: 'linear-gradient(135deg, #0f766e, #00BFA5)',
      border: '2px solid #00BFA5',
      color: 'white',
      boxShadow: '0 0 20px rgba(0, 191, 165, 0.4)',
      ...style
    } : style;

    return (
      <Comp
        className={cn(spaceButtonVariants({ variant, size, className }))}
        style={defaultStyle}
        onMouseEnter={(e) => {
          if (variant === "default") {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.boxShadow = '0 0 30px rgba(0, 191, 165, 0.6), 0 0 60px rgba(94, 234, 212, 0.4)';
            target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (variant === "default") {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.boxShadow = '0 0 20px rgba(0, 191, 165, 0.4)';
            target.style.transform = 'translateY(0)';
          }
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
SpaceButton.displayName = "SpaceButton"

export { SpaceButton, spaceButtonVariants }
