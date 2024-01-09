import { type DragControls } from '../types'
import { type DragControlsParams, useDragControls } from './use-drag-controls'

export const useControlsState = <T>(
  init: DragControlsParams<T>,
  dragControls: DragControls<T> | undefined
) => {
  const internal = useDragControls(init)

  return dragControls ?? internal
}
