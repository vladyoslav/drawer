import { Content } from './content'
import { Overlay } from './overlay'
import { Portal } from './portal'
import { Root } from './root'
import { SnapAreas } from './snap-areas'

export type { RootProps } from './root'
export type { ContentProps } from './content'
export type { PortalProps } from './portal'
export type { OverlayProps } from './overlay'

export const Drawer = {
  Root,
  Content,
  Portal,
  Overlay,
  SnapAreas
}

export {
  Root as DrawerRoot,
  Content as DrawerContent,
  Portal as DrawerPortal,
  Overlay as DrawerOverlay,
  SnapAreas as DrawerSnapAreas
}
