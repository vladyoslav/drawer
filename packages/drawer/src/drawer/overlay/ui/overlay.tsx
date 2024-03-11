import React, { forwardRef } from 'react'

import { Overlay as RadixPrimitive } from '@radix-ui/react-dialog'

import { Wrapper, type WrapperProps } from './wrapper'

export interface OverlayProps extends WrapperProps {}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ ...props }, ref) => {
    return (
      <Wrapper ref={ref} {...props}>
        <RadixPrimitive />
      </Wrapper>
    )
  }
)

Overlay.displayName = 'Drawer.Overlay'
