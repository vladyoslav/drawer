import { type FC, forwardRef } from 'react'

import {
  DrawerCustomOverlay,
  type DrawerCustomOverlayProps
} from '@vladyoslav/drawer'

export const CustomOverlay: FC<DrawerCustomOverlayProps> = forwardRef<
  HTMLDivElement,
  DrawerCustomOverlayProps
>((props, ref) => (
  <DrawerCustomOverlay
    ref={ref}
    className="fixed inset-0 bg-black/40"
    {...props}
  />
))

CustomOverlay.displayName = 'CustomOverlay'
