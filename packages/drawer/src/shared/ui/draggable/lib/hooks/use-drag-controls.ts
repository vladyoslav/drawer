import { useConstant } from '@/shared/lib/hooks'

import { DragControls } from '../types'

export const useDragControls = <T>(initLocked = false): DragControls<T> => {
  const controls = useConstant(() => new DragControls<T>(initLocked))

  return controls
}
