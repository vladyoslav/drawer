import { type RefObject } from 'react'

import { type Snap } from '@/drawer/lib/types'

import { getSnap } from '../../helpers'

export const useGetSnap = (snapPoints: Snap[], ref: RefObject<HTMLElement>) => {
  return (value: number) => {
    if (ref.current === null) return

    return getSnap(snapPoints, value, ref.current)
  }
}
