import { useState } from 'react'

import { type OnOpenChange } from '@/drawer/lib/types'

export const useOpenState = (
  init: boolean,
  open?: boolean,
  onOpenChange?: OnOpenChange
): [boolean, OnOpenChange] => {
  const internal = useState(init)

  return open && onOpenChange ? [open, onOpenChange] : internal
}
