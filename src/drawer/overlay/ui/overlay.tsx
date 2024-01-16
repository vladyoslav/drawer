import React, { forwardRef, useRef } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'
import {
  type DialogOverlayProps as OverlayPrimitiveProps,
  Overlay as RadixOverlayPrimitive
} from '@radix-ui/react-dialog'
import { Presence } from '@radix-ui/react-presence'

import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext, usePortalContext } from '@/drawer/lib/hooks'
import { clamp, isNumber } from '@/shared/lib/helpers'
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
  (WithRadixPrimitiveProps | WithCustomPrimitiveProps)

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ radixPrimitive = true, ...props }, forwardedRef) => {
    const contextForceMount = usePortalContext()

    const { drawerControls, drawerRef, snapPoints, open } = useDrawerContext()
    const { forceMount = contextForceMount, ...other } = props

    const lastPoint = snapPoints[snapPoints.length - 1]

    const ref = useRef<HTMLDivElement>(null)
    const composedRef = useComposedRefs(ref, forwardedRef)

    const [setStyle, resetStyle] = useSetStyle(ref)

    useValueChange(drawerControls.y, (latest) => {
      const node = drawerRef.current
      if (!node) return

      const y = isNumber(latest) ? latest : cssToPx(latest, node)
      const opacity = clamp(0, 1, -y / cssToPx(lastPoint, node))

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
