import React, { type PropsWithChildren, forwardRef } from 'react'

import { Draggable } from '@/shared/ui/draggable'

export interface ScrollableProps extends PropsWithChildren {}

export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(
  ({ ...props }, ref) => {
    return (
      <Draggable
        ref={ref}
        {...props}
        constraints={{
          min: (el) => {
            const rect = el.getBoundingClientRect()
            const parent = el.parentNode as HTMLElement
            const parentRect = parent.getBoundingClientRect()

            return parentRect.height - rect.height
          },
          max: 0
        }}
        onConstraint={console.log}
      />
    )
  }
)

Scrollable.displayName = 'Drawer.Scrollable'
