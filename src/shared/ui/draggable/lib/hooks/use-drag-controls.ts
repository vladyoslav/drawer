import { type DragControls } from '../types'
import { useValue } from './use-value'

export const useDragControls = (initial: boolean = false): DragControls => {
  const canDrag = useValue(initial)

  return {
    enable: () => canDrag.set(true),
    disable: () => canDrag.set(false),
    canDrag: () => canDrag.get()
  }
}
