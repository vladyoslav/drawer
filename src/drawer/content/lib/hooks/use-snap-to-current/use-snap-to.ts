import { type MotionValue } from 'framer-motion'

import { isNumber } from '@/lib/helpers'
import { type Snap } from '@/lib/types'

export const useSnapTo = (y: MotionValue<Snap>) => {
  return (to: Snap) => y.jump(isNumber(to) ? -to : `-${to}`)
}
