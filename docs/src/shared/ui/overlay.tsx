import { type FC, forwardRef } from 'react'

import { DrawerOverlay, type DrawerOverlayProps } from '@vladyoslav/drawer'

export const Overlay: FC<DrawerOverlayProps> = forwardRef<
  HTMLDivElement,
  DrawerOverlayProps
>((props, ref) => (
  <DrawerOverlay
    ref={ref}
    className="bg-black/80 fixed inset-0 z-overlay"
    {...props}
  />
))

Overlay.displayName = 'Overlay'
