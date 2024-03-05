import { type RefObject } from 'react'

import { cssToPx } from '@/drawer/lib/helpers'
import { type Snap } from '@/drawer/lib/types'

import { getSnap } from '../../helpers'

export const useGetSnap = (snapPoints: Snap[], ref: RefObject<HTMLElement>) => {
  return (pos: number, velocity: number) => {
    if (ref.current === null) return

    const lastPoint = snapPoints[snapPoints.length - 1]
    const maxAddValue = cssToPx(lastPoint, ref.current)
    const posWithVelocity = pos + -velocity * maxAddValue

    return getSnap(snapPoints, posWithVelocity, ref.current)
  }
}
