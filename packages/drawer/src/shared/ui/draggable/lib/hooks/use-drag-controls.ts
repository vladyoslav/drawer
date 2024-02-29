import { useValue } from '@/shared/lib/hooks'

import { type DragControls, type NumberOr } from '../types'

export const useDragControls = <T>(initLocked = false): DragControls<T> => {
  const locked = useValue(initLocked)
  const y = useValue<NumberOr<T>>(0)
  const isDragging = useValue(false)

  return {
    lock: () => locked.set(true),
    unlock: () => locked.set(false),
    locked,
    y,
    isDragging
  }
}
