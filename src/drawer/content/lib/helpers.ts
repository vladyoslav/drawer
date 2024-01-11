import { getSnapAreas } from '@/drawer/lib/helpers'
import { type Snap } from '@/drawer/lib/types'
import { isNumber } from '@/shared/lib/helpers'
import { type TransformTemplate } from '@/shared/ui/draggable'

export const transformTemplate: TransformTemplate = (y) =>
  `translate3d(0, calc(100% + ${isNumber(y) ? `${y}px` : y}), 0)`

export const getSnap = (snapPoints: Snap[], value: number, el: HTMLElement) => {
  const snapAreas = getSnapAreas(snapPoints, el)

  for (let i = 0; i < snapAreas.length; i++)
    if (value <= snapAreas[i]) return snapPoints[i]

  return snapPoints[snapPoints.length - 1]
}
