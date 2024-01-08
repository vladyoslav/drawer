import { type PointerEvent, useRef } from 'react'

import { clamp, isNumber } from '@/shared/lib/helpers'
import { useValue } from '@/shared/lib/hooks'
import { type Value } from '@/shared/lib/types'

import { getConstraint, shouldDrag } from '../helpers'
import {
  ConstraintType,
  type Constraints,
  type DragControls,
  type DragEventHandler
} from '../types'

interface DraggableOptions<T> {
  y: Value<T | number>
  dragControls?: DragControls
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
  onDragStart?: DragEventHandler
  onDragMove?: DragEventHandler
  onDragEnd?: DragEventHandler
}

export const useDraggable = <T>({
  y,
  dragControls,
  constraints,
  onConstraint,
  onDragStart,
  onDragMove,
  onDragEnd
}: DraggableOptions<T>) => {
  const last = useRef(0)
  const initialY = useValue(0)

  const wantToDrag = useValue(false)
  const isDragging = useValue(false)

  const ref = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return

    isDragging.set(true)
    node.setPointerCapture(e.pointerId)

    onDragStart?.(e, { delta: 0 })
  }

  const handleDrag: DragEventHandler = (e, info) => {
    const node = ref.current
    if (!node) return

    const getNumberY = () => {
      // Resetting y and checking rect y
      y.set(0)
      const resettedY = node.getBoundingClientRect().y

      return initialY.get() - resettedY
    }

    const curY = y.get()
    const curNumberY = isNumber(curY) ? curY : getNumberY()
    const newY = curNumberY + info.delta

    onDragMove?.(e, info)

    if (!constraints) return y.set(newY)

    // Constraints
    const min = getConstraint(constraints[ConstraintType.Min], node)
    const max = getConstraint(constraints[ConstraintType.Max], node)

    y.set(clamp(min, max, newY))

    if (newY <= min) onConstraint?.(ConstraintType.Min)
    if (newY >= max) onConstraint?.(ConstraintType.Max)
  }

  const handleDragEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging.get()) {
      onDragEnd?.(e, { delta: e.screenY - last.current })
    }

    cancelDrag()
  }

  const cancelDrag = () => {
    isDragging.set(false)
    wantToDrag.set(false)
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (wantToDrag.get()) return

    last.current = e.screenY

    const node = ref.current
    if (!node) return

    initialY.set(node.getBoundingClientRect().y)

    wantToDrag.set(true)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const delta = e.screenY - last.current
    last.current = e.screenY

    if (!wantToDrag.get()) return

    const node = ref.current
    if (!node) return

    // Runs once per drag
    if (!isDragging.get()) {
      const passed = shouldDrag(e.target as HTMLElement, node, delta > 0)

      if (!passed) return cancelDrag()

      handleDragStart(e)
    }

    // Check controls
    if (dragControls && !dragControls.canDrag()) return

    handleDrag(e, { delta })
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => handleDragEnd(e)

  const onPointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    console.log('cancel')
    handleDragEnd(e)
  }

  return {
    ref,
    isDragging,
    listeners: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel }
  }
}
