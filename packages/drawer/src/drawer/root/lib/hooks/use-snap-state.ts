import { useState } from 'react'

import { type SetSnap, type Snap } from '@/drawer/lib/types'

export const useSnapState = (init: Snap, snap?: Snap, setSnap?: SetSnap) => {
  const internal = useState(init)

  return snap && setSnap ? ([snap, setSnap] as const) : internal
}
