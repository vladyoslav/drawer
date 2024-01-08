import { type TouchEvent } from 'react'

export interface DragControls {
  enable: () => void
  disable: () => void
  canDrag: () => boolean
}

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

export type Style = Record<string, string>

export interface DragInfo {
  delta: number
}

export type DragEventHandler<T = Element> = (
  event: TouchEvent<T>,
  info: DragInfo
) => void
