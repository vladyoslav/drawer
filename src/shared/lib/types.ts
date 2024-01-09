export type Without<T, K extends keyof any> = Omit<T, K> & { [P in K]?: never }

export type WithoutThisOrThat<T, K extends keyof any, P extends keyof any> =
  | Without<T, K>
  | Without<T, P>

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

export type Style = Record<string, string>
