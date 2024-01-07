import { useRef } from 'react'

export type Handler<T> = (latest: T) => void

type Set<T> = (value: T) => void
type Get<T> = () => T
type Unsubscribe = () => void
type Subscribe<T> = (handler: Handler<T>) => Unsubscribe

export type Value<T> = { set: Set<T>; get: Get<T>; subscribe: Subscribe<T> }

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
