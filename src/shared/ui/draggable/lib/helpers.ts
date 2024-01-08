import { type TouchEvent } from 'react'

import { isFunction } from '@/shared/lib/helpers'

import { type Constraint, type Style, type TransformTemplate } from './types'

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
    }

    if (element === root) return true

    // Move up to the parent element
    element = element.parentNode as HTMLElement
  }

  return true
}

// Some code was taken from https://github.com/emilkowalski/vaul/blob/main/src/helpers.ts
const cache = new WeakMap<HTMLElement, Style>()

export const setStyle = (el: HTMLElement, style: Style) => {
  const original: Style = {}
  const elStyle = el.style as unknown as Style

  for (const [key, value] of Object.entries(style)) {
    original[key] = elStyle[key]
    elStyle[key] = value
  }

  const cached = cache.get(el)
  cache.set(el, { ...cached, ...original })
}

export const resetStyle = (el: HTMLElement, prop?: string) => {
  const original = cache.get(el)

  if (!original) return

  const elStyle = el.style as unknown as Style

  if (prop) return (elStyle[prop] = original[prop])

  Object.entries(original).forEach(([key, value]) => {
    elStyle[key] = value
  })
}

export const blockScrollableParents = (el: HTMLElement, root: HTMLElement) => {
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

export const getScreenY = (e: TouchEvent<HTMLElement>) => {
  return e.touches[0].screenY
}
