import React, { type FC } from 'react'

import {
  Portal as PortalPrimitive,
  type DialogPortalProps as PortalPrimitiveProps
} from '@radix-ui/react-dialog'

import { PortalContextProvider } from '@/drawer/lib/providers'

export interface PortalProps extends PortalPrimitiveProps {}

export const Portal: FC<PortalProps> = ({ ...props }) => {
  return (
    <PortalContextProvider forceMount={props.forceMount}>
      <PortalPrimitive {...props} />
    </PortalContextProvider>
  )
}

Portal.displayName = 'Drawer.Portal'
