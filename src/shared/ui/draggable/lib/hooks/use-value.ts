import { useRef } from 'react'

import {
  type Get,
  type Handler,
  type Set,
  type Subscribe,
  type Value
} from '../../lib/types'

export const useValue = <T>(initial: T): Value<T> => {
  const v = useRef(initial)
  const key = useRef(0)

  const handlers = new Map<number, Handler<T>>()

  const set: Set<T> = (value) => {
    if (v.current === value) return

    v.current = value

    handlers.forEach((handler) => handler(value))
  }

  const subscribe: Subscribe<T> = (handler) => {
    const oldKey = key.current

    handlers.set(oldKey, handler)

    key.current += 1

    return () => handlers.delete(oldKey)
  }

  const get: Get<T> = () => v.current

  return {
    set,
    get,
    subscribe
  }
}
