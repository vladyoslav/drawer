import { type TouchEvent, useRef } from 'react'

import { clamp, isNumber } from '@/shared/lib/helpers'
import { useValue } from '@/shared/lib/hooks'
import { type Value } from '@/shared/lib/types'

import {
  blockScrollableParents,
  getConstraint,
  getScreenY,
  shouldDrag,
  unlockScrollableParents
} from '../helpers'
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

  const target = useRef<HTMLElement | null>(null)

  const ref = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: TouchEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return

    isDragging.set(true)
    // node.setPointerCapture(e.pointerId)

    target.current = e.target as HTMLElement

    blockScrollableParents(target.current, node)

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

  const handleDragEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging.get()) return

    if (target.current && ref.current)
      unlockScrollableParents(target.current, ref.current)

    cancelDrag()

    onDragEnd?.(e, { delta: 0 })
  }

  const cancelDrag = () => {
    isDragging.set(false)
    wantToDrag.set(false)
    target.current = null
  }

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (wantToDrag.get()) return

    last.current = getScreenY(e)

    const node = ref.current
    if (!node) return

    initialY.set(node.getBoundingClientRect().y)

    wantToDrag.set(true)
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const screenY = getScreenY(e)
    const delta = screenY - last.current
    last.current = screenY

    if (!wantToDrag.get()) return

    const node = ref.current
    if (!node) return

    // Check controls
    if (dragControls && !dragControls.canDrag()) return

    // Runs once per drag
    if (!isDragging.get()) {
      const passed = shouldDrag(e.target as HTMLElement, node, delta > 0)

      if (!passed) return cancelDrag()

      handleDragStart(e)
    }

    handleDrag(e, { delta })
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => handleDragEnd(e)

  const onTouchCancel = (e: TouchEvent<HTMLDivElement>) => {
    handleDragEnd(e)
  }

  return {
    ref,
    isDragging,
    listeners: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel }
  }
}
