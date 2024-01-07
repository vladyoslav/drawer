import { type MotionValue } from 'framer-motion'

import { type Snap } from '@/drawer/lib/types'
import { isNumber } from '@/shared/lib/helpers'

export const useSnapTo = (y: MotionValue<Snap>) => {
  return (to: Snap) => y.jump(isNumber(to) ? -to : `-${to}`)
}
