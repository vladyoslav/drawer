export * from './drawer-value'

export type Without<T, K extends keyof any> = Omit<T, K> & { [P in K]?: never }

export type WithoutThisOrThat<T, K extends keyof any, P extends keyof any> =
  | Without<T, K>
  | Without<T, P>

export type Style = Record<string, string>
