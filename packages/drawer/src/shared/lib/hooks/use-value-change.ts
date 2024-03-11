import { useEffect } from 'react'

import { type DrawerValue } from '../classes'
import { type Handler } from '../types'

export const useValueChange = <T>(
  value: DrawerValue<T>,
  handler: Handler<T>
) => {
  useEffect(() => {
    const unsub = value.subscribe(handler)

    return () => {
      unsub()
    }
  }, [])
}
