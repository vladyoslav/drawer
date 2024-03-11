import { type Snap } from '@/drawer/lib/types'
import { type DrawerValue } from '@/shared/lib/classes'
import { isNumber } from '@/shared/lib/helpers'

export const useSnapTo = (y: DrawerValue<Snap>) => {
  return (to: Snap) => y.set(isNumber(to) ? -to : `-${to}`)
}
