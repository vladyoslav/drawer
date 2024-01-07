import { useEffect } from 'react'

import { type Snap } from '@/drawer/lib/types'

import { type SnapTo } from '../types'

export const useSnapToCurrent = (snapTo: SnapTo, snap: Snap, open: boolean) => {
  return useEffect(() => {
    if (open) snapTo(snap)
    else snapTo(0)
  }, [open, snap])
}
