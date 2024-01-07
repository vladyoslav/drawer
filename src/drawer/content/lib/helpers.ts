import { isNumber } from '@/shared/lib/helpers'
import { type TransformTemplate } from '@/shared/ui/draggable'

// export const transformTemplate: MotionProps['transformTemplate'] = (
//   { y },
//   generated
// ) => {
//   const translateY =
//     isString(y) && (y.endsWith('px') || y.endsWith('%')) ? y : `${y}px`
//
//   // fixing bad Y without spaces
//   // example 1: translateY(100% + -100px-61.5px)
//   // example 2: translateY(100% + -100px61.5px)
//   const fixedY = translateY.replace(BAD_Y_REGEX, `$1 + $2`)
//
//   // replacing translateY or translate3d with proper value
//   return generated.replace(TRANSLATE_Y_REGEX, `$1$4calc(100% + ${fixedY})$3$6`)
// }

export const transformTemplate: TransformTemplate = (y) =>
  `translate3d(0, calc(100% + ${isNumber(y) ? `${y}px` : y}), 0)`
