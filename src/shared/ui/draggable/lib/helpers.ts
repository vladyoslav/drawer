import { isFunction } from '@/shared/lib/helpers'

import { type Constraint, type TransformTemplate } from './types'

export const getConstraint = (c: Constraint, el: HTMLElement) =>
  isFunction(c) ? c(el) : c

export const defaultTransformTemplate: TransformTemplate = (y) =>
  `translate3d(0, ${y}px, 0)`

const reachedBottom = (el: HTMLElement) =>
  Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 2

const hasScrollOverflow = (el: HTMLElement) => {
  const scrollOverflows = ['scroll', 'auto']

  const overflow = window.getComputedStyle(el).overflow

  return scrollOverflows.includes(overflow)
}

// Some code was taken from https://github.com/emilkowalski/vaul/blob/main/src/index.tsx
export const shouldDrag = (
  el: HTMLElement,
  root: HTMLElement,
  isDraggingDown: boolean
) => {
  const selection = window.getSelection()?.toString()

  if (selection && selection.length) return false

  let element = el

  // Keep climbing up the DOM tree as long as there's a parent
  while (element) {
    // Check if the element is scrollable
    if (element.scrollHeight > element.clientHeight) {
      const top = element.scrollTop === 0 && isDraggingDown

      const bottom = reachedBottom(element) && !isDraggingDown

      const scrollOverflow = hasScrollOverflow(element)

      if (!top && !bottom && scrollOverflow) return false

      if (element === root) return true
    }

    // Move up to the parent element
    element = element.parentNode as HTMLElement
  }

  return true
}
