import { type PointerEvent as ReactPointerEvent } from 'react'

export * from './drag-controls'

export enum ConstraintType {
  Min = 'min',
  Max = 'max'
}

export type Constraint = number | ((el: HTMLElement) => number)
export interface Constraints {
  [ConstraintType.Min]: Constraint
  [ConstraintType.Max]: Constraint
}

export type TransformTemplate = <T>(y: T) => string

export interface DragInfo {
  delta: number
  velocity: number
}

export type DragEventHandler<T = Element> = (
  event: ReactPointerEvent<T>,
  info: DragInfo
) => void

export type ConstraintEventHandler<T = Element> = (
  event: ReactPointerEvent<T>,
  type: ConstraintType
) => void | boolean
