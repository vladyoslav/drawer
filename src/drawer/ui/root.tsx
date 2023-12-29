import React, { type FC, type PropsWithChildren } from 'react'

import { useMotionValue } from 'framer-motion'

import { useOpenState, useSnapState } from '../lib/hooks'
import {
  DrawerContextProvider,
  type DrawerContextValue
} from '../lib/providers'
import {
  type OnOpenChange,
  type SetSnap,
  type Snap,
  type WithoutThisOrThat
} from '../lib/types'

type OpenProps = WithoutThisOrThat<
  { defaultOpen?: boolean; open: boolean; onOpenChange: OnOpenChange },
  'defaultOpen',
  'open' | 'onOpenChange'
>

type SnapProps = WithoutThisOrThat<
  { snapPoints?: Snap[]; snap: Snap; setSnap: SetSnap },
  '',
  'snap' | 'setSnap'
>

export type RootProps = PropsWithChildren &
  OpenProps &
  SnapProps & {
    dismissible?: boolean
  }

export const Root: FC<RootProps> = ({
  defaultOpen = false,
  open: cOpen,
  onOpenChange: cOnOpenChange,
  snapPoints = ['100%'],
  snap: cSnap,
  setSnap: cSetSnap,
  dismissible = true,
  children
}) => {
  const y = useMotionValue<Snap>(0)

  const [open, onOpenChange] = useOpenState(defaultOpen, cOpen, cOnOpenChange)
  const [snap, setSnap] = useSnapState(snapPoints[0], cSnap, cSetSnap)

  const context: DrawerContextValue = {
    y,
    defaultOpen,
    open,
    onOpenChange,
    snapPoints,
    snap,
    setSnap,
    dismissible
  }

  return (
    <DrawerContextProvider value={context}>{children}</DrawerContextProvider>
  )
}
