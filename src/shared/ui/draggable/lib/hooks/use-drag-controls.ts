import { useValue } from './use-value'

export type DragControls = {
  enable: () => void
  disable: () => void
  canDrag: () => boolean
}

export const useDragControls = (initial: boolean = false) => {
  const canDrag = useValue(initial)

  return {
    enable: () => canDrag.set(true),
    disable: () => canDrag.set(false),
    canDrag: () => canDrag.get()
  }
}
