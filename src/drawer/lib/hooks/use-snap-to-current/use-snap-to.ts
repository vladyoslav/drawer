import { type MotionValue } from 'framer-motion'

import { isNumber } from '../../helpers'
import { type Snap } from '../../types'

export const useSnapTo = (y: MotionValue<Snap>) => {
  return (to: Snap) => y.jump(isNumber(to) ? -to : `-${to}`)
}
