import React, { type PropsWithChildren, forwardRef } from 'react'

import { useDrawerContext } from '@/drawer/lib/hooks'
import { Draggable } from '@/shared/ui/draggable'

import { getMinConstraint } from '../lib/helpers'

export interface ScrollableProps extends PropsWithChildren {}

export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(
  ({ ...props }, ref) => {
    const { scrollableControls } = useDrawerContext()

    return (
      <Draggable
        vladyoslav-drawer-scrollable=""
        ref={ref}
        dragControls={scrollableControls}
        {...props}
        constraints={{
          min: getMinConstraint,
          max: 0
        }}
      />
    )
  }
)

Scrollable.displayName = 'Drawer.Scrollable'
