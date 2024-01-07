import { type RefObject } from 'react'

export const useSetStyle = (ref: RefObject<HTMLDivElement>) => {
  return (style: Partial<CSSStyleDeclaration>) => {
    const el = ref.current
    if (!el) return

    Object.entries(style).forEach(
      ([key, value]) => ((el.style as any)[key] = value)
    )
  }
}
