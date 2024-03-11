import { DrawerValue } from '../types'
import { useConstant } from './use-constant'

export const useValue = <T>(initial: T): DrawerValue<T> => {
  const value = useConstant(() => new DrawerValue(initial))

  return value
}
