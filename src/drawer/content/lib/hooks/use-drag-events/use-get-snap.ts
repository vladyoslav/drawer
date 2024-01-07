import { type RefObject } from 'react'

import { cssToPx } from '@/drawer/lib/helpers'
import { type Snap } from '@/drawer/lib/types'

export const useGetSnap = (snapPoints: Snap[], ref: RefObject<HTMLElement>) => {
  const toPx = (value: Snap) => cssToPx(value, ref.current)

  return (value: number) => {
    let prev = snapPoints[0]

    for (const snap of snapPoints) {
      if (value <= toPx(snap)) {
        return value > (toPx(prev) + toPx(snap)) / 2 ? snap : prev
      }

      prev = snap
    }

    return snapPoints[snapPoints.length - 1]
  }
}
