import { Y_REGEX } from './constants'

export const getTranslateY = (el: HTMLElement) => {
  const transform = window.getComputedStyle(el).transform

  const matches = transform.match(Y_REGEX)

  if (!matches) return null

  return parseFloat(matches[1] ?? matches[2])
}
