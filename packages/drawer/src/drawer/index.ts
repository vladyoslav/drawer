import { Close, Description, Title, Trigger } from '@radix-ui/react-dialog'

import { Content } from './content'
import './index.css'
import { CustomOverlay, Overlay } from './overlay'
import { Portal } from './portal'
import { Root } from './root'
import { SnapAreas } from './snap-areas'

export type { Snap } from './lib/types'

export type { RootProps as DrawerRootProps } from './root'
export type { ContentProps as DrawerContentProps } from './content'
export type { PortalProps as DrawerPortalProps } from './portal'
export type {
  OverlayProps as DrawerOverlayProps,
  CustomOverlayProps as DrawerCustomOverlayProps
} from './overlay'

export type {
  DialogTriggerProps as DrawerTriggerProps,
  DialogTitleProps as DrawerTitleProps,
  DialogDescriptionProps as DrawerDescriptionProps,
  DialogCloseProps as DrawerCloseProps
} from '@radix-ui/react-dialog'

export { useDrawerValues as useDrawerValues } from './lib/hooks'

export { cssToPx as defaultCssToPx } from './lib/helpers'

export {
  Root,
  Content,
  Portal,
  Overlay,
  CustomOverlay,
  Trigger,
  Close,
  Title,
  Description,
  //
  Root as DrawerRoot,
  Content as DrawerContent,
  Portal as DrawerPortal,
  Overlay as DrawerOverlay,
  CustomOverlay as DrawerCustomOverlay,
  Trigger as DrawerTrigger,
  Close as DrawerClose,
  Title as DrawerTitle,
  Description as DrawerDescription
}

export { SnapAreas as NOT_FOR_PRODUCTION_USE_SnapAreas }
