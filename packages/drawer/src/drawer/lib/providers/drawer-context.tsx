import React, {
  type FC,
  type PropsWithChildren,
  type RefObject,
  createContext
} from 'react'

import {
  type ConstraintEventHandler,
  type DragControls
} from '@/shared/ui/draggable'

import { type OnOpenChange, type OnSnapChange, type Snap } from '../types'

export interface DrawerContextValue {
  drawerControls: DragControls<Snap>
  scrollableControls: DragControls<number>
  defaultOpen: boolean
  open: boolean
  onOpenChange: OnOpenChange
  snapPoints: Snap[]
  snap: Snap
  onSnapChange: OnSnapChange
  dismissible: boolean
  drawerRef: RefObject<HTMLDivElement>
  scrollableRef: RefObject<HTMLDivElement>
  scrollLockTimeout: number
  modal: boolean
  onDrawerConstraint: ConstraintEventHandler
  onScrollableConstraint: ConstraintEventHandler
  velocityMultiplier: number
  elasticity: number
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export interface DrawerContextProviderProps extends PropsWithChildren {
  value: DrawerContextValue
}

export const DrawerContextProvider: FC<DrawerContextProviderProps> = (
  props
) => <DrawerContext.Provider {...props} />
