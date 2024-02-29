import { clamp, isFunction } from '@/shared/lib/helpers'

import { type Constraint, type TransformTemplate } from './types'

export const getConstraint = (c: Constraint, el: HTMLElement) =>
  isFunction(c) ? c(el) : c

export const defaultTransformTemplate: TransformTemplate = (y) =>
  `translate3d(0, ${y}px, 0)`

const reachedBottom = (el: HTMLElement) =>
  Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 2

const hasScrollOverflow = (el: HTMLElement) => {
  const style = window.getComputedStyle(el)
  const overflows = ['scroll', 'auto']

  return (
    overflows.includes(style.overflowY) || overflows.includes(style.overflow)
  )
}

// Some code was taken from https://github.com/emilkowalski/vaul/blob/main/src/index.tsx
export const shouldDrag = (
  el: HTMLElement,
  root: HTMLElement,
  isDraggingDown: boolean,
  checkScroll: boolean
) => {
  const selection = window.getSelection()?.toString()

  if (selection && selection.length) return false

  if (!checkScroll) return true

  let element = el

  // Keep climbing up the DOM tree as long as there's a parent
  while (element) {
    // Check if the element is scrollable
    if (element.scrollHeight > element.clientHeight) {
      const top = element.scrollTop <= 0 && isDraggingDown

      const bottom = reachedBottom(element) && !isDraggingDown

      const scrollOverflow = hasScrollOverflow(element)

      if (!top && !bottom && scrollOverflow) return false
    }

    if (element === root) return true

    // Move up to the parent element
    element = element.parentNode as HTMLElement
  }

  return true
}

// Some code was taken from https://github.com/clauderic/dnd-kit/blob/master/stories/3%20-%20Examples/Drawer/modifiers.ts'
const rubberband = (dis: number, dim: number, el: number) => {
  return (dis * dim * el) / (dim + el * dis)
}

const reverseRubberband = (dis: number, dim: number, el: number) => {
  return (dis * dim) / (el * (dim - dis))
}

const applyRubberband = (
  pos: number,
  min: number,
  max: number,
  func = rubberband,
  el = 0.3
) => {
  if (el === 0) return clamp(min, max, pos)
  if (pos < min) return -func(min - pos, 100, el) + min
  if (pos > max) return +func(pos - max, 100, el) + max
  return pos
}

export const getDumpedValue = (pos: number, min: number, max: number) =>
  applyRubberband(pos, min, max)

export const getUndumpedValue = (pos: number, min: number, max: number) =>
  applyRubberband(pos, min, max, reverseRubberband)

// Px per ms
export const getVelocity = (delta: number, timeDelta: number) =>
  delta / timeDelta
