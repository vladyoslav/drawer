import { type RefObject } from 'react'

import { type Snap } from '@/drawer/lib/types'
import {
  type ConstraintEventHandler,
  ConstraintType,
  type DragControls
} from '@/shared/ui/draggable'

export const useConstraintEvents = (
  drawerRef: RefObject<HTMLDivElement>,
  scrollableRef: RefObject<HTMLDivElement>,
  drawerControls: DragControls<Snap>,
  scrollableControls: DragControls<number>
) => {
  const onDrawerConstraint: ConstraintEventHandler = (_, type) => {
    if (!drawerRef.current) return
    if (!scrollableRef.current) return
    if (type === ConstraintType.Max) return

    drawerControls.lock()
    scrollableControls.unlock()

    return false
  }

  const onScrollableConstraint: ConstraintEventHandler = (_, type) => {
    if (!scrollableRef.current) return
    if (type === ConstraintType.Min) return true

    drawerControls.unlock()
    scrollableControls.lock()

    // return false
  }

  return { onDrawerConstraint, onScrollableConstraint }
}
