import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva } from "class-variance-authority"

import { toggleVariants } from "@/components/ui/toggle.jsx"
import { cn } from "@/lib/utils.js"

const ToggleGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(
  ({ className, children, variant, size, ...props }, ref) => (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
)

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem } 