import React, { type FC } from 'react'

import {
  Portal as PortalPrimitive,
  type DialogPortalProps as PortalPrimitiveProps
} from '@radix-ui/react-dialog'

export interface PortalProps extends PortalPrimitiveProps {}

export const Portal: FC<PortalProps> = (props) => {
  return <PortalPrimitive {...props} />
}

Portal.displayName = 'Drawer.Portal'
