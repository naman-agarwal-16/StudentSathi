import * as React from "react"
import { cn } from "@/lib/utils"

const SpaceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border text-card-foreground shadow transition-all duration-300",
      "hover:shadow-2xl hover:-translate-y-1",
      className
    )}
    style={{
      background: 'rgba(0, 77, 64, 0.15)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 191, 165, 0.3)',
      boxShadow: '0 0 20px rgba(0, 191, 165, 0.1), inset 0 0 30px rgba(0, 77, 64, 0.05)',
    }}
    {...props}
  />
))
SpaceCard.displayName = "SpaceCard"

const SpaceCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
SpaceCardHeader.displayName = "SpaceCardHeader"

const SpaceCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight",
      className
    )}
    style={{
      color: '#5eead4',
      textShadow: '0 0 10px rgba(94, 234, 212, 0.3)',
    }}
    {...props}
  />
))
SpaceCardTitle.displayName = "SpaceCardTitle"

const SpaceCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SpaceCardDescription.displayName = "SpaceCardDescription"

const SpaceCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
SpaceCardContent.displayName = "SpaceCardContent"

const SpaceCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
SpaceCardFooter.displayName = "SpaceCardFooter"

export { SpaceCard, SpaceCardHeader, SpaceCardFooter, SpaceCardTitle, SpaceCardDescription, SpaceCardContent }
