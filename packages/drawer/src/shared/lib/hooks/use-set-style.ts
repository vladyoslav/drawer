import { type RefObject } from 'react'

import { resetStyle, setStyle } from '../helpers'
import { type Style } from '../types'

export const useSetStyle = (ref: RefObject<HTMLElement>) => {
  const set = (style: Style) => {
    const el = ref.current
    if (!el) return

    setStyle(el as HTMLElement, style)
  }

  const reset = (prop?: string) => {
    const el = ref.current
    if (!el) return

    resetStyle(el as HTMLElement, prop)
  }

  return [set, reset] as const
}
