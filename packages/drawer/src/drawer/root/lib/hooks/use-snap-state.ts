import { useState } from 'react'

import { type OnSnapChange, type Snap } from '@/drawer/lib/types'

export const useSnapState = (
  init: Snap,
  snap?: Snap,
  onSnapChange?: OnSnapChange
) => {
  const internal = useState(init)

  return snap && onSnapChange ? ([snap, onSnapChange] as const) : internal
}
