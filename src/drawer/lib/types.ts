import { type MotionProps } from 'framer-motion'

export type WithoutMotionProps<T> = Omit<T, keyof MotionProps>

export type OnOpenChange = (open: boolean) => void

export type Snap = number | string

export type SetSnap = (snap: Snap) => void
