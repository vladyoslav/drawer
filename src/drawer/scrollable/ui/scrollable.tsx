import React, { type PropsWithChildren, forwardRef } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { useDrawerContext } from '@/drawer/lib/hooks'
import { Draggable } from '@/shared/ui/draggable'
import { ConstraintType } from '@/shared/ui/draggable/lib/types'

import { getMinConstraint } from '../lib/helpers'

export interface ScrollableProps extends PropsWithChildren {}

export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(
  ({ ...props }, forwardedRef) => {
    const { drawerControls, scrollableControls, scrollableRef, drawerRef } =
      useDrawerContext()

    const composedRef = useComposedRefs(scrollableRef, forwardedRef)

    return (
      <Draggable
        vladyoslav-drawer-scrollable=""
        ref={composedRef}
        dragControls={scrollableControls}
        constraints={{
          min: getMinConstraint,
          max: 0
        }}
        onConstraint={(_, type) => {
          if (!scrollableRef.current) return
          if (type === ConstraintType.Min) return

          // Set y to max constraint
          scrollableControls.y.set(0)

          drawerControls.unlock()
          scrollableControls.lock()
        }}
        {...props}
      />
    )
  }
)

Scrollable.displayName = 'Drawer.Scrollable'
