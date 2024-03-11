import { Close, Description, Title, Trigger } from '@radix-ui/react-dialog'

import { Content } from './content'
import './index.css'
import { CustomOverlay, Overlay } from './overlay'
import { Portal } from './portal'
import { Root } from './root'
import { Scrollable } from './scrollable'
import { SnapAreas } from './snap-areas'

export type { Snap } from './lib/types'
export type { RootProps as DrawerRootProps } from './root'
export type { ContentProps as DrawerContentProps } from './content'
export type { PortalProps as DrawerPortalProps } from './portal'
export type {
  OverlayProps as DrawerOverlayProps,
  CustomOverlayProps as DrawerCustomOverlayProps
} from './overlay'
export type { ScrollableProps as DrawerScrollableProps } from './scrollable'
export type {
  DialogTriggerProps as DrawerTriggerProps,
  DialogTitleProps as DrawerTitleProps,
  DialogDescriptionProps as DrawerDescriptionProps,
  DialogCloseProps as DrawerCloseProps
} from '@radix-ui/react-dialog'

export const Drawer = {
  Root,
  Content,
  Portal,
  Overlay,
  CustomOverlay,
  SnapAreas,
  Scrollable,
  Trigger,
  Close,
  Title,
  Description
}

export {
  Root as DrawerRoot,
  Content as DrawerContent,
  Portal as DrawerPortal,
  Overlay as DrawerOverlay,
  CustomOverlay as DrawerCustomOverlay,
  SnapAreas as DrawerSnapAreas,
  Scrollable as DrawerScrollable,
  Trigger as DrawerTrigger,
  Close as DrawerClose,
  Title as DrawerTitle,
  Description as DrawerDescription
}
