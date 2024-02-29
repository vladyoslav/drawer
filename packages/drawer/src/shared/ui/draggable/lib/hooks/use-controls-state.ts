import { type DragControls } from '../types'
import { useDragControls } from './use-drag-controls'

export const useControlsState = <T>(
  dragControls: DragControls<T> | undefined,
  initLocked?: boolean
) => {
  const internal = useDragControls<T>(initLocked)

  return dragControls ?? internal
}
