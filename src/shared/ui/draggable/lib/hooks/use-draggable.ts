import { type PointerEvent, useRef } from 'react'

import { clamp } from '@/shared/lib/helpers'
import { useValue } from '@/shared/lib/hooks'
import { type Value } from '@/shared/lib/types'

import { getConstraint } from '../helpers'
import {
  ConstraintType,
  type Constraints,
  type DragControls,
  type TransformTemplate
} from '../types'
import { useSetStyle } from './use-set-style'

interface DraggableOptions<T> {
  y: Value<T | number>
  transformTemplate: TransformTemplate
  dragControls?: DragControls
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
}

export const useDraggable = <T>({
  y,
  transformTemplate,
  dragControls,
  constraints,
  onConstraint
}: DraggableOptions<T>) => {
  const last = useRef(0)

  const isDragging = useValue(false)

  const ref = useRef<HTMLDivElement>(null)

  const setStyle = useSetStyle(ref)

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging.get()) return

    last.current = e.screenY

    const node = ref.current
    if (!node) return

    node.setPointerCapture(e.pointerId)

    const curRect = node.getBoundingClientRect()

    // turning off transition
    isDragging.set(true)

    // resetting y, but not firing useValueChange
    setStyle({ transform: transformTemplate(0) })
    const initRect = node.getBoundingClientRect()

    y.set(curRect.y - initRect.y)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const delta = e.screenY - last.current

    last.current = e.screenY

    if (!isDragging.get()) return
    if (dragControls && !dragControls.canDrag()) return

    // is a number because it was set in onPointerDown
    const newY = (y.get() as number) + delta

    if (!constraints) return y.set(newY)

    const node = ref.current
    if (!node) return

    const min = getConstraint(constraints[ConstraintType.Min], node)

    const max = getConstraint(constraints[ConstraintType.Max], node)

    y.set(clamp(min, max, newY))

    if (newY <= min) onConstraint?.(ConstraintType.Min)
    if (newY >= max) onConstraint?.(ConstraintType.Max)
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.set(false)
  }

  const onPointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.set(false)
  }

  return {
    ref,
    isDragging,
    listeners: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel }
  }
}
