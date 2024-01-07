import { isFunction } from '@/shared/lib/helpers'

import { type Constraint } from './types'

export const getConstraint = (c: Constraint, el: HTMLElement) =>
  isFunction(c) ? c(el) : c
