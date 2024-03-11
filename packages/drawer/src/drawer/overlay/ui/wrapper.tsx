import React, { forwardRef, useRef } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { type DialogOverlayProps as OverlayPrimitiveProps } from '@radix-ui/react-dialog'
import { Slot } from '@radix-ui/react-slot'

import { type Snap } from '@/drawer'
import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext } from '@/drawer/lib/hooks'
import { clamp } from '@/shared/lib/helpers'
import { useSetStyle, useValueChange } from '@/shared/lib/hooks'

export interface WrapperProps extends OverlayPrimitiveProps {
  fadeFrom?: Snap
  finalOpacity?: number
}

export const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ fadeFrom = 0, finalOpacity = 0.8, ...props }, forwardedRef) => {
    const { drawerControls, drawerRef, snapPoints } = useDrawerContext()

    const lastPoint = snapPoints[snapPoints.length - 1]

    const ref = useRef<HTMLDivElement>(null)
    const composedRef = useComposedRefs(ref, forwardedRef)

    const [setStyle, resetStyle] = useSetStyle(ref)

    useValueChange(drawerControls.y, (latest) => {
      const node = drawerRef.current
      if (!node) return

      const y = cssToPx(latest, node)
      const fadeFromY = cssToPx(fadeFrom, node)
      const opacity = clamp(
        0,
        1,
        ((-y - fadeFromY) / (cssToPx(lastPoint, node) - fadeFromY)) *
          finalOpacity
      )

      setStyle({ opacity: opacity.toString() })
    })

    useValueChange(drawerControls.isDragging, (latest) => {
      if (latest) setStyle({ transition: 'none' })
      else resetStyle('transition')
    })

    return (
      <Slot
        vladyoslav-drawer-overlay=""
        data-testid="overlay"
        ref={composedRef}
        {...props}
      />
    )
  }
)

Wrapper.displayName = 'Drawer.Wrapper'
