import { useRef } from 'react'

import {
  type Get,
  type Handler,
  type Set,
  type Subscribe,
  type Value
} from '../types'

export const useValue = <T>(initial: T): Value<T> => {
  const v = useRef(initial)
  const key = useRef(0)

  const handlers = useRef(new Map<number, Handler<T>>())

  const notify = () => {
    handlers.current.forEach((handler) => handler(v.current))
  }

  const set: Set<T> = (value) => {
    if (value === v.current) return

    v.current = value

    notify()
  }

  const subscribe: Subscribe<T> = (handler) => {
    const oldKey = key.current

    handlers.current.set(oldKey, handler)

    key.current += 1

    return () => handlers.current.delete(oldKey)
  }

  const get: Get<T> = () => v.current

  return {
    set,
    get,
    subscribe
  }
}
