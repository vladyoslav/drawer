import { type Snap } from '@/drawer/lib/types'
import { isNumber } from '@/shared/lib/helpers'
import { type Value } from '@/shared/lib/types'

export const useSnapTo = (y: Value<Snap>) => {
  return (to: Snap) => y.set(isNumber(to) ? -to : `-${to}`)
}
