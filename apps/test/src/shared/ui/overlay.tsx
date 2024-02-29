import { type FC, forwardRef } from 'react'

import { DrawerOverlay, type DrawerOverlayProps } from '@vladyoslav/drawer'

export const Overlay: FC<DrawerOverlayProps> = forwardRef<
  HTMLDivElement,
  DrawerOverlayProps
>((props, ref) => (
  <DrawerOverlay ref={ref} className="fixed inset-0 bg-black/40" {...props} />
))

Overlay.displayName = 'Overlay'
