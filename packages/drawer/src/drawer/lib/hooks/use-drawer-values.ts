import { type Snap } from '@/drawer'
import { useConstant } from '@/shared/lib/hooks'
import { type DragValues } from '@/shared/ui/draggable'

import { useDrawerContext } from './use-drawer-context'

export const useDrawerValues = (): DragValues<Snap> => {
  const { drawerControls } = useDrawerContext()

  const values = useConstant(() => drawerControls)

  return values
}
