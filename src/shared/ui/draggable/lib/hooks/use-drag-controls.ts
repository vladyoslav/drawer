import { useValue } from '@/shared/lib/hooks'

import { type DragControls } from '../types'

export const useDragControls = (initial: boolean = false): DragControls => {
  const canDrag = useValue(initial)

  return {
    enable: () => canDrag.set(true),
    disable: () => canDrag.set(false),
    canDrag: () => canDrag.get()
  }
}
