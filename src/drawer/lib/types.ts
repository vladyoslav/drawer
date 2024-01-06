import { type MotionProps } from 'framer-motion'

export type WithoutMotionProps<T> = Omit<T, keyof MotionProps>

export type Without<T, K extends keyof any> = Omit<T, K> & { [P in K]?: never }

export type WithoutThisOrThat<T, K extends keyof any, P extends keyof any> =
  | Without<T, K>
  | Without<T, P>

export type OnOpenChange = (open: boolean) => void

export type Snap = number | string

export type SetSnap = (snap: Snap) => void
