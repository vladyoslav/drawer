import { useRef } from 'react'

// https://github.com/framer/motion/blob/main/packages/framer-motion/src/utils/use-constant.ts
export function useConstant<T>(init: () => T) {
  const ref = useRef<T | null>(null)

  if (ref.current === null) ref.current = init()

  return ref.current
}
