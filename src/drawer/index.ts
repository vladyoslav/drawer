import { Content } from './content'
import './index.css'
import { Overlay } from './overlay'
import { Portal } from './portal'
import { Root } from './root'
import { Scrollable } from './scrollable'
import { SnapAreas } from './snap-areas'

export type { RootProps as DrawerRootProps } from './root'
export type { ContentProps as DrawerContentProps } from './content'
export type { PortalProps as DrawerPortalProps } from './portal'
export type { OverlayProps as DrawerOverlayProps } from './overlay'
export type { ScrollableProps as DrawerScrollableProps } from './scrollable'

export const Drawer = {
  Root,
  Content,
  Portal,
  Overlay,
  SnapAreas,
  Scrollable
}

export {
  Root as DrawerRoot,
  Content as DrawerContent,
  Portal as DrawerPortal,
  Overlay as DrawerOverlay,
  SnapAreas as DrawerSnapAreas,
  Scrollable as DrawerScrollable
}
