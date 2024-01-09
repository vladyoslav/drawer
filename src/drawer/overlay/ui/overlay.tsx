import React, { forwardRef, useRef } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'
import {
  Overlay as OverlayPrimitive,
  type DialogOverlayProps as OverlayPrimitiveProps
} from '@radix-ui/react-dialog'

import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext } from '@/drawer/lib/hooks'
import { clamp, isNumber } from '@/shared/lib/helpers'
import { useSetStyle, useValueChange } from '@/shared/lib/hooks'

export interface OverlayProps extends OverlayPrimitiveProps {}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ ...props }, forwardedRef) => {
    const { drawerControls, drawerRef } = useDrawerContext()

    const ref = useRef<HTMLDivElement>(null)
    const composedRef = useComposedRefs(ref, forwardedRef)

    const [setStyle, resetStyle] = useSetStyle(ref)

    useValueChange(drawerControls.y, (latest) => {
      const node = drawerRef.current
      if (!node) return

      const y = isNumber(latest) ? latest : cssToPx(latest, node)
      const opacity = clamp(0, 1, -y / node.getBoundingClientRect().height)

      setStyle({ opacity: opacity.toString() })
    })

    useValueChange(drawerControls.isDragging, (latest) => {
      if (latest) setStyle({ transition: 'none' })
      else resetStyle('transition')
    })

    return (
      <OverlayPrimitive
        vladyoslav-drawer-overlay=""
        ref={composedRef}
        {...props}
      />
    )
  }
)

Overlay.displayName = 'Drawer.Overlay'
