import { type PointerEvent, useRef } from 'react'

import { clamp } from '@/shared/lib/helpers'
import { useValue } from '@/shared/lib/hooks'
import { type Value } from '@/shared/lib/types'

import { getConstraint, shouldDrag } from '../helpers'
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
  const passedShouldDrag = useValue(false)

  const ref = useRef<HTMLDivElement>(null)

  const setStyle = useSetStyle(ref)

  const cancelDrag = () => {
    isDragging.set(false)
    passedShouldDrag.set(false)
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging.get()) return

    last.current = e.screenY

    const node = ref.current
    if (!node) return

    // node.setPointerCapture(e.pointerId)

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

    const node = ref.current
    if (!node) return

    if (!passedShouldDrag.get()) {
      const passed = shouldDrag(e.target as HTMLElement, node, delta > 0)

      console.log('passed', passed)

      passedShouldDrag.set(passed)

      if (!passed) return cancelDrag()
    }

    if (dragControls && !dragControls.canDrag()) return

    // was set to number in onPointerDown
    const newY = (y.get() as number) + delta

    if (!constraints) return y.set(newY)

    // constraints
    const min = getConstraint(constraints[ConstraintType.Min], node)
    const max = getConstraint(constraints[ConstraintType.Max], node)

    y.set(clamp(min, max, newY))

    if (newY <= min) onConstraint?.(ConstraintType.Min)
    if (newY >= max) onConstraint?.(ConstraintType.Max)
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => cancelDrag()

  const onPointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    console.log('cancel')
    cancelDrag()
  }

  return {
    ref,
    isDragging,
    listeners: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel }
  }
}
