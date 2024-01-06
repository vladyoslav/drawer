import React, { type FC } from 'react'

import {
  Portal as PortalPrimitive,
  type DialogPortalProps as PortalPrimitiveProps
} from '@radix-ui/react-dialog'

export interface PortalProps extends Omit<PortalPrimitiveProps, 'forceMount'> {}

export const Portal: FC<PortalProps> = (props) => {
  return <PortalPrimitive forceMount {...props} />
}

Portal.displayName = 'Drawer.Portal'
