import { useEffect } from 'react'

import { type DrawerValue, type Handler } from '../types'

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
