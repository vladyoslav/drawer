import { type Snap } from '@/drawer/lib/types'
import { isNumber } from '@/shared/lib/helpers'
import { type DrawerValue } from '@/shared/lib/types'

export const useSnapTo = (y: DrawerValue<Snap>) => {
  return (to: Snap) => y.set(isNumber(to) ? -to : `-${to}`)
}
