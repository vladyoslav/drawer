'use client'

import React, { forwardRef } from 'react'

import {
  type ComponentPropsWithoutRef,
  Primitive
} from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { RemoveScroll } from 'react-remove-scroll'

import { useDrawerContext } from '@/drawer/lib/hooks'

interface OverlayPrimitiveProps
  extends ComponentPropsWithoutRef<typeof Primitive.div> {
  blockInteraction?: boolean
}

// Code from https://github.com/radix-ui/primitives/blob/main/packages/react/dialog/src/Dialog.tsx#L197
export const OverlayPrimitive = forwardRef<
  HTMLDivElement,
  OverlayPrimitiveProps
>((props, ref) => {
  const { drawerRef, open, modal } = useDrawerContext()
  const { style, blockInteraction = modal, ...other } = props

  return (
    <RemoveScroll
      enabled={blockInteraction}
      as={Slot}
      allowPinchZoom
      shards={[drawerRef]}
    >
      <Primitive.div
        data-state={open ? 'open' : 'closed'}
        ref={ref}
        // We re-enable pointer-events prevented by `Dialog.Content` to allow scrolling the overlay.
        style={{
          pointerEvents: blockInteraction ? 'auto' : 'none',
          ...style
        }}
        {...other}
      />
    </RemoveScroll>
  )
})

OverlayPrimitive.displayName = 'Drawer.OverlayPrimitive'
