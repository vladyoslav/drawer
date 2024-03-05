'use client'

import React, { type FC, type PropsWithChildren, useRef } from 'react'

import { Root as RootPrimitive } from '@radix-ui/react-dialog'

import {
  DrawerContextProvider,
  type DrawerContextValue
} from '@/drawer/lib/providers'
import {
  type OnOpenChange,
  type OnSnapChange,
  type Snap
} from '@/drawer/lib/types'
import { type WithoutThisOrThat } from '@/shared/lib/types'
import { useDragControls } from '@/shared/ui/draggable'

import {
  useConstraintEvents,
  useOpenState,
  useScaledBackground,
  useSnapState
} from '../lib/hooks'

type OpenProps = WithoutThisOrThat<
  { defaultOpen?: boolean; open: boolean; onOpenChange: OnOpenChange },
  'defaultOpen',
  'open' | 'onOpenChange'
>

type SnapProps = WithoutThisOrThat<
  { snapPoints?: Snap[]; snap: Snap; onSnapChange: OnSnapChange },
  '',
  'snap' | 'onSnapChange'
>

interface WithScaledBackground {
  scaleFrom?: Snap
  shouldScaleBackground: true
}

interface WithoutScaledBackground {
  scaleFrom?: never
  shouldScaleBackground?: false
}

export type RootProps = PropsWithChildren &
  OpenProps &
  SnapProps & {
    dismissible?: boolean
    modal?: boolean
    scrollLockTimeout?: number
    velocityMultiplier?: number
  } & (WithScaledBackground | WithoutScaledBackground)

export const Root: FC<RootProps> = ({
  defaultOpen = false,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  snapPoints = ['100%'],
  snap: snapProp,
  onSnapChange: onSnapChangeProp,
  dismissible = true,
  modal = true,
  scrollLockTimeout = 300,
  scaleFrom = 0,
  shouldScaleBackground = false,
  velocityMultiplier = snapPoints.length > 1 ? 0.15 : 1,
  children
}) => {
  const drawerControls = useDragControls<Snap>()
  const scrollableControls = useDragControls<number>(true)

  const [open, onOpenChange] = useOpenState(
    defaultOpen,
    openProp,
    onOpenChangeProp
  )
  const [snap, onSnapChange] = useSnapState(
    snapPoints[0],
    snapProp,
    onSnapChangeProp
  )

  const drawerRef = useRef<HTMLDivElement>(null)
  const scrollableRef = useRef<HTMLDivElement>(null)

  const constraintHandlers = useConstraintEvents(
    drawerRef,
    scrollableRef,
    drawerControls,
    scrollableControls
  )

  const context: DrawerContextValue = {
    drawerControls,
    scrollableControls,
    defaultOpen,
    open,
    onOpenChange,
    snapPoints,
    snap,
    onSnapChange,
    dismissible,
    drawerRef,
    scrollableRef,
    scrollLockTimeout,
    modal,
    velocityMultiplier,
    ...constraintHandlers
  }

  useScaledBackground(
    drawerControls,
    drawerRef,
    snapPoints,
    shouldScaleBackground,
    scaleFrom
  )

  return (
    <RootPrimitive open={open} onOpenChange={onOpenChange} modal={modal}>
      <DrawerContextProvider value={context}>{children}</DrawerContextProvider>
    </RootPrimitive>
  )
}
