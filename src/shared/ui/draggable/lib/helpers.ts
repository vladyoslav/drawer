import { clamp, isFunction, resetStyle, setStyle } from '@/shared/lib/helpers'

import { type Constraint, type TransformTemplate } from './types'

export const getConstraint = (c: Constraint, el: HTMLElement) =>
  isFunction(c) ? c(el) : c

export const defaultTransformTemplate: TransformTemplate = (y) =>
  `translate3d(0, ${y}px, 0)`

const reachedBottom = (el: HTMLElement) =>
  Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 2

const hasScrollOverflow = (el: HTMLElement) => {
  const overflow = window.getComputedStyle(el).overflowY

  return ['scroll', 'auto'].includes(overflow)
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
      const top = element.scrollTop === 0 && isDraggingDown

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

export const lockScrollableParents = (el: HTMLElement, root: HTMLElement) => {
  let element = el

  while (element) {
    if (element.scrollHeight > element.clientHeight) {
      if (hasScrollOverflow(element)) setStyle(element, { overflow: 'hidden' })
    }

    if (element === root) return

    element = element.parentNode as HTMLElement
  }
}

export const unlockScrollableParents = (el: HTMLElement, root: HTMLElement) => {
  let element = el

  while (element) {
    if (element.scrollHeight > element.clientHeight) {
      resetStyle(element, 'overflow')
    }

    if (element === root) return

    element = element.parentNode as HTMLElement
  }
}

// Some code was taken from https://github.com/clauderic/dnd-kit/blob/master/stories/3%20-%20Examples/Drawer/modifiers.ts'

const getValidDim = (dim: number) =>
  dim === 0 || Math.abs(dim) === Infinity ? 100 : dim

const rubberband = (dis: number, rawDim: number, el: number) => {
  const dim = getValidDim(rawDim)
  return (dis * dim * el) / (dim + el * dis)
}

const reverseRubberband = (dis: number, rawDim: number, el: number) => {
  const dim = getValidDim(rawDim)
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
  if (pos < min) return -func(min - pos, max - min, el) + min
  if (pos > max) return +func(pos - max, max - min, el) + max
  return pos
}

export const getDumpedValue = (pos: number, min: number, max: number) =>
  applyRubberband(pos, min, max)

export const getUndumpedValue = (pos: number, min: number, max: number) =>
  applyRubberband(pos, min, max, reverseRubberband)

// Px per ms
export const getVelocity = (delta: number, timeDelta: number) =>
  delta / timeDelta
