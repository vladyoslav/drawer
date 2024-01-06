import React, {
  type FC,
  type PropsWithChildren,
  type RefObject,
  createContext
} from 'react'

import { type MotionValue } from 'framer-motion'

import { type OnOpenChange, type SetSnap, type Snap } from '../types'

export interface DrawerContextValue {
  y: MotionValue<Snap>
  defaultOpen: boolean
  open: boolean
  onOpenChange: OnOpenChange
  snapPoints: Snap[]
  snap: Snap
  setSnap: SetSnap
  dismissible: boolean
  drawerRef: RefObject<HTMLDivElement>
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export interface DrawerContextProviderProps extends PropsWithChildren {
  value: DrawerContextValue
}

export const DrawerContextProvider: FC<DrawerContextProviderProps> = (
  props
) => <DrawerContext.Provider {...props} />
