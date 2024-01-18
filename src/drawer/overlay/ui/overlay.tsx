import React, { forwardRef, useRef } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'
import {
  type DialogOverlayProps as OverlayPrimitiveProps,
  Overlay as RadixOverlayPrimitive
} from '@radix-ui/react-dialog'
import { Presence } from '@radix-ui/react-presence'

import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext, usePortalContext } from '@/drawer/lib/hooks'
import { clamp } from '@/shared/lib/helpers'
import { useSetStyle, useValueChange } from '@/shared/lib/hooks'

import { OverlayPrimitive } from './overlay-primitive'

interface WithCustomPrimitiveProps {
  radixPrimitive: false
  blockInteraction?: boolean
}

interface WithRadixPrimitiveProps {
  radixPrimitive?: boolean
  blockInteraction?: never
}

export type OverlayProps = OverlayPrimitiveProps &
  (WithRadixPrimitiveProps | WithCustomPrimitiveProps) & {
    fadeFromIndex?: number
    finalOpacity?: number
  }

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (
    { radixPrimitive = true, fadeFromIndex, finalOpacity = 0.8, ...props },
    forwardedRef
  ) => {
    const contextForceMount = usePortalContext()

    const { drawerControls, drawerRef, snapPoints, open } = useDrawerContext()
    const { forceMount = contextForceMount, ...other } = props

    const lastPoint = snapPoints[snapPoints.length - 1]
    const fadeFrom = fadeFromIndex !== undefined ? snapPoints[fadeFromIndex] : 0

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

    if (radixPrimitive)
      return (
        <RadixOverlayPrimitive
          vladyoslav-drawer-overlay=""
          ref={composedRef}
          {...other}
        />
      )

    return (
      <Presence present={forceMount || open}>
        <OverlayPrimitive
          vladyoslav-drawer-overlay=""
          ref={composedRef}
          {...other}
        />
      </Presence>
    )
  }
)

Overlay.displayName = 'Drawer.Overlay'
