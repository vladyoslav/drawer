import { useEffect } from 'react'

import { type MotionValue } from 'framer-motion'

import { type Snap } from '../../types'
import { useSnapTo } from './use-snap-to'

export const useSnapToCurrent = (
  y: MotionValue<Snap>,
  snap: Snap,
  open: boolean,
  isDragging: boolean
) => {
  const snapTo = useSnapTo(y)

  return useEffect(() => {
    if (isDragging) return

    if (open) snapTo(snap)
    else snapTo(0)
  }, [open, snap, isDragging])
}
