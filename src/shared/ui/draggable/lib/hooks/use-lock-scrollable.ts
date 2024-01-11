import { type RefObject } from 'react'

import { lockScrollableParents, unlockScrollableParents } from '../helpers'

export const useLockScrollable = (
  root: RefObject<HTMLElement>,
  target: RefObject<HTMLElement>
) => {
  const lock = () => {
    if (!target.current || !root.current) return

    lockScrollableParents(target.current, root.current)
  }

  const unclock = () => {
    if (!target.current || !root.current) return

    unlockScrollableParents(target.current, root.current)
  }

  return [lock, unclock] as const
}
