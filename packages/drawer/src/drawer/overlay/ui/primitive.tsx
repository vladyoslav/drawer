'use client'

import React, { forwardRef } from 'react'

import {
  type ComponentPropsWithoutRef,
  Primitive as RadixPrimitive
} from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'
import { RemoveScroll } from 'react-remove-scroll'

import { useDrawerContext } from '@/drawer/lib/hooks'

export interface PrimitiveProps
  extends ComponentPropsWithoutRef<typeof RadixPrimitive.div> {
  blockInteraction?: boolean
}

// Code from https://github.com/radix-ui/primitives/blob/main/packages/react/dialog/src/Dialog.tsx#L197
export const Primitive = forwardRef<HTMLDivElement, PrimitiveProps>(
  (props, ref) => {
    const { drawerRef, open, modal } = useDrawerContext()
    const { style, blockInteraction = modal, ...other } = props

    return (
      <RemoveScroll
        enabled={blockInteraction}
        as={Slot}
        allowPinchZoom
        shards={[drawerRef]}
      >
        <RadixPrimitive.div
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
  }
)

Primitive.displayName = 'Drawer.Primitive'
