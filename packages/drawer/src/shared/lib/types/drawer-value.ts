import { addUniqueItem, removeItem } from '@/shared/lib/helpers'

export type Handler<T> = (latest: T) => void

export class DrawerValue<T> {
  private _current: T
  private _handlers: Handler<T>[] = []

  /** @internal */
  constructor(initial: T) {
    this._current = initial
  }

  subscribe(handler: Handler<T>): VoidFunction {
    addUniqueItem(this._handlers, handler)

    return () => removeItem(this._handlers, handler)
  }

  /** @internal */
  set(value: T) {
    if (value === this._current) return

    this._current = value

    this._handlers.forEach((handler) => handler(this._current))
  }

  get(): T {
    return this._current
  }
}
