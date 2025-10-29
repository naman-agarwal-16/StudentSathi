import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Simplified Chart Components for StudentSathi

// Basic Chart Container
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config?: Record<string, { label?: string; color?: string }>;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full h-full", className)}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
        {children}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

// Simple Tooltip
export const ChartTooltip = RechartsPrimitive.Tooltip

// Custom Tooltip Content
interface TooltipContentProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number | string
    name: string
    color: string
    payload?: Record<string, unknown>
  }>
  label?: string
  className?: string
}

export const ChartTooltipContent: React.FC<TooltipContentProps> = ({
  active,
  payload,
  label,
  className
}) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-3 shadow-md",
        className
      )}
    >
      {label && (
        <div className="mb-2 font-medium text-foreground">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Simple Legend
export const ChartLegend = RechartsPrimitive.Legend

// Custom Legend Content
interface LegendContentProps {
  payload?: Array<{
    value: string
    type?: string
    color?: string
  }>
  className?: string
}

export const ChartLegendContent: React.FC<LegendContentProps> = ({
  payload,
  className
}) => {
  if (!payload?.length) {
    return null
  }

  return (
    <div className={cn("flex items-center justify-center gap-4 pt-4", className)}>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

// Export everything we need
export {
  RechartsPrimitive as Recharts
}