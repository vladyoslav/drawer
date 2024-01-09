import { type TouchEvent, useRef } from 'react'

import { clamp, isNumber } from '@/shared/lib/helpers'
import { useValue } from '@/shared/lib/hooks'
import { useControlsState } from '@/shared/ui/draggable/lib/hooks/use-controls-state'

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
  type DragEventHandler,
  type NumberOr
} from '../types'

interface DraggableOptions<T> {
  dragControls?: DragControls<T>
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
  onDragStart?: DragEventHandler
  onDragMove?: DragEventHandler
  onDragEnd?: DragEventHandler
}

export const useDraggable = <T>({
  dragControls: cDragControls,
  constraints,
  onConstraint,
  onDragStart,
  onDragMove,
  onDragEnd
}: DraggableOptions<T>) => {
  const dragControls = useControlsState({}, cDragControls)

  const y = dragControls.y
  const last = useRef(0)
  const initTop = useRef(0)
  const initY = useRef<NumberOr<T> | null>(null)

  const wantToDrag = useValue(false)
  const isDragging = dragControls.isDragging

  const target = useRef<HTMLElement | null>(null)

  const ref = useRef<HTMLDivElement>(null)

  const getNumberY = () => {
    const node = ref.current
    if (!node) return 0

    // Resetting y and checking rect y
    y.set(0)
    const resettedTop = node.getBoundingClientRect().top

    return initTop.current - resettedTop
  }

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
    const wasDragging = isDragging.get()

    if (target.current && ref.current)
      unlockScrollableParents(target.current, ref.current)

    // Resetting to the position before dragging
    if (initY.current !== null) {
      y.set(initY.current)
      initY.current = null
    }

    cancelDrag()

    wasDragging && onDragEnd?.(e, { delta: 0 })
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

    initTop.current = node.getBoundingClientRect().top

    // Stopping transition and setting y to current number value
    wantToDrag.set(true)

    const curTop = node.getBoundingClientRect().top

    // Dragging during transition
    if (initTop.current !== curTop) {
      initY.current = y.get()
      y.set(getNumberY())
    }
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const screenY = getScreenY(e)
    const delta = screenY - last.current
    last.current = screenY

    if (!wantToDrag.get()) return

    const node = ref.current
    if (!node) return

    // Check controls
    if (dragControls.isLocked()) return

    // Runs once per drag
    if (!isDragging.get()) {
      const passed = shouldDrag(e.target as HTMLElement, node, delta > 0)

      if (!passed) {
        // Return to the position before onPress event
        // y.set(initY.get())

        return cancelDrag()
      }

      handleDragStart(e)
    }

    handleDrag(e, { delta })
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    handleDragEnd(e)
  }

  const onTouchCancel = (e: TouchEvent<HTMLDivElement>) => {
    handleDragEnd(e)
  }

  return {
    ref,
    y,
    isDragging,
    wantToDrag,
    listeners: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel }
  }
}
