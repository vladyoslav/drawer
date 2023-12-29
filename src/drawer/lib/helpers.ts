import { type MotionProps } from 'framer-motion'

import {
  BAD_Y_REGEX,
  PERCENT_REGEX,
  PX_REGEX,
  TRANSLATE_Y_REGEX
} from './constants'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const transformTemplate: MotionProps['transformTemplate'] = (
  { y },
  generated
) => {
  const translateY =
    isString(y) && (y.endsWith('px') || y.endsWith('%')) ? y : `${y}px`

  // fixing bad Y without spaces
  // example 1: translateY(100% + -100px-61.5px)
  // example 2: translateY(100% + -100px61.5px)
  const fixedY = translateY.replace(BAD_Y_REGEX, `$1 + $2`)

  // replacing translateY or translate3d with proper value
  return generated.replace(TRANSLATE_Y_REGEX, `$1$4calc(100% + ${fixedY})$3$6`)
}

export const cssToPx = (
  value: number | string,
  el: HTMLElement | null
): number => {
  if (!el) throw new Error('You have to provide element')

  const rect = el.getBoundingClientRect()

  if (isNumber(value)) return rect.height * value

  if (value.match(PERCENT_REGEX)) return (rect.height * parseFloat(value)) / 100

  if (value.match(PX_REGEX)) return parseFloat(value)

  throw new Error('Unknown value units')
}

export const clamp = (min: number, max: number, value: number) =>
  Math.min(max, Math.max(min, value))
