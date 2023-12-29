import { type TransitionEventHandler } from 'react'

export const useSafeRemove = (open: boolean, remove?: (() => void) | null) => {
  const onTransitionEnd: TransitionEventHandler = (e) => {
    if (open) return
    if (e.propertyName !== 'transform') return

    remove?.()
  }

  return { onTransitionEnd }
}
