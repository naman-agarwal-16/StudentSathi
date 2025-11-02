import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpaceInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SpaceInput = React.forwardRef<HTMLInputElement, SpaceInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "bg-transparent",
          className
        )}
        style={{
          background: 'rgba(0, 121, 107, 0.05)',
          borderBottom: '2px solid rgba(0, 191, 165, 0.3)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderBottom = '2px solid #00BFA5';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 191, 165, 0.3)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderBottom = '2px solid rgba(0, 191, 165, 0.3)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
SpaceInput.displayName = "SpaceInput"

export { SpaceInput }
