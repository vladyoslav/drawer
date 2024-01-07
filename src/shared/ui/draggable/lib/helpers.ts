import { isFunction } from '@/shared/lib/helpers'

import { type Constraint, type TransformTemplate } from './types'

export const getConstraint = (c: Constraint, el: HTMLElement) =>
  isFunction(c) ? c(el) : c

export const defaultTransformTemplate: TransformTemplate = (y) =>
  `translate3d(0, ${y}px, 0)`
