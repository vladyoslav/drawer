import { PERCENT_REGEX, PX_REGEX } from './constants'
import { type Snap } from './types'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const clamp = (min: number, max: number, value: number) =>
  Math.min(max, Math.max(min, value))

export const mergeHandlers = <T>(
  ...handlers: Array<((e: T) => void) | undefined>
) => {
  return (e: T) => handlers.forEach((handler) => handler?.(e))
}

export const cssToPx = (
  value: number | string,
  el: HTMLElement | null
): number => {
  if (!el) throw new Error('You have to provide element')

  const rect = el.getBoundingClientRect()

  if (isNumber(value)) return value

  if (value.match(PERCENT_REGEX)) return (rect.height * parseFloat(value)) / 100

  if (value.match(PX_REGEX)) return parseFloat(value)

  throw new Error('Unknown value units')
}

export const getSnapAreas = (snapPoints: Snap[], el: HTMLElement | null) => {
  const toPx = (value: Snap) => cssToPx(value, el)

  // [0, '200px', '500px', '1000px']
  // [100, 350, 750]
  const [first, ...other] = snapPoints

  let prev = first

  const snapAreas = []

  for (const snap of other) {
    snapAreas.push((toPx(prev) + toPx(snap)) / 2)
    prev = snap
  }

  return snapAreas
}
