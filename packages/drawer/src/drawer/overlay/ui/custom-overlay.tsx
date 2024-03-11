import React, { forwardRef } from 'react'

import { Presence } from '@radix-ui/react-presence'

import { useDrawerContext, usePortalContext } from '@/drawer/lib/hooks'

import { Primitive as CustomPrimitive, type PrimitiveProps } from './primitive'
import { Wrapper, type WrapperProps } from './wrapper'

export interface CustomOverlayProps extends WrapperProps, PrimitiveProps {}

export const CustomOverlay = forwardRef<HTMLDivElement, CustomOverlayProps>(
  ({ ...props }, ref) => {
    const contextForceMount = usePortalContext()
    const { open } = useDrawerContext()
    const { forceMount = contextForceMount, ...other } = props

    return (
      <Presence present={forceMount || open}>
        <Wrapper ref={ref} {...other}>
          <CustomPrimitive />
        </Wrapper>
      </Presence>
    )
  }
)

CustomOverlay.displayName = 'Drawer.CustomOverlay'
