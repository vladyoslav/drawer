import { useValue } from '@/shared/lib/hooks'

import { type DragControls, type NumberOr } from '../types'

export interface DragControlsParams<T> {
  initLocked?: boolean
  initY?: NumberOr<T>
  initDragging?: boolean
}

export const useDragControls = <T>({
  initLocked = false,
  initY = 0,
  initDragging = false
}: DragControlsParams<T>): DragControls<T> => {
  const isLocked = useValue(initLocked)
  const y = useValue(initY)
  const isDragging = useValue(initDragging)

  return {
    lock: () => isLocked.set(true),
    unlock: () => isLocked.set(false),
    isLocked: () => isLocked.get(),
    y,
    isDragging
  }
}
