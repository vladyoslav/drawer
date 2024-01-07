import { useValue } from '@/shared/lib/hooks'
import { type Value } from '@/shared/lib/types'

export const useY = <T>(init: T, y?: Value<T>) => {
  const internal = useValue(init)

  return y ?? internal
}
