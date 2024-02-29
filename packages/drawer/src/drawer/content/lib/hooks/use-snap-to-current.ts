import { useEffect } from 'react'

import { type Snap } from '@/drawer/lib/types'

import { type SnapTo } from '../types'

export const useSnapToCurrent = (snapTo: SnapTo, snap: Snap, open: boolean) => {
  return useEffect(() => {
    // setTimeout fixes the opening animation when there's no `Drawer.Overlay`
    // if (open) setTimeout(() => snapTo(snap), 0)
    if (open) snapTo(snap)
    else snapTo(0)
  }, [open, snap])
}
