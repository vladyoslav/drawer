import { type FC } from 'react'

import { DrawerOverlay, type DrawerOverlayProps } from '@vladyoslav/drawer'

export const Overlay: FC<DrawerOverlayProps> = (props) => (
  <DrawerOverlay className="bg-black/40 fixed inset-0" {...props} />
)
