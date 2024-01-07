export type Handler<T> = (latest: T) => void

export type Set<T> = (value: T) => void
export type Get<T> = () => T
export type Unsubscribe = () => void
export type Subscribe<T> = (handler: Handler<T>) => Unsubscribe

export interface Value<T> {
  set: Set<T>
  get: Get<T>
  subscribe: Subscribe<T>
}

export interface DragControls {
  enable: () => void
  disable: () => void
  canDrag: () => boolean
}
