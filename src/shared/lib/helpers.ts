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
