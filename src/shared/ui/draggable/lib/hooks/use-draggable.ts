import { type PointerEvent, useRef } from 'react'

import { clamp, isNumber } from '@/shared/lib/helpers'
import { useSetStyle, useValue } from '@/shared/lib/hooks'

import {
  getConstraint,
  getDumpedValue,
  getUndumpedValue,
  getVelocity,
  shouldDrag
} from '../helpers'
import {
  ConstraintType,
  type Constraints,
  type DragControls,
  type DragEventHandler,
  type NumberOr,
  type TransformTemplate
} from '../types'

interface DraggableOptions<T> {
  dragControls: DragControls<T>
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
  onDragStart?: DragEventHandler
  onDragMove?: DragEventHandler
  onDragEnd?: DragEventHandler
  transformTemplate?: TransformTemplate
  snapToConstraints: boolean
}

export const useDraggable = <T>({
  dragControls,
  transformTemplate,
  constraints,
  onConstraint,
  onDragStart,
  onDragMove,
  onDragEnd,
  snapToConstraints
}: DraggableOptions<T>) => {
  const { y, isDragging } = dragControls

  const last = useRef(0)
  const lastTime = useRef(0)
  const lastVelocity = useRef(0)

  const initTop = useRef(0)
  const initY = useRef<NumberOr<T> | null>(null)

  const wantToDrag = useValue(false)

  const startEvent = useRef<PointerEvent<HTMLElement> | null>(null)

  const ref = useRef<HTMLDivElement>(null)
  const [setStyle, resetStyle] = useSetStyle(ref)

  const getNumberY = () => {
    const node = ref.current
    if (!node) return 0

    // Resetting y and checking rect y
    setStyle({ transform: transformTemplate?.(0) ?? 'none' })
    const resettedTop = node.getBoundingClientRect().top
    resetStyle('transform')

    return initTop.current - resettedTop
  }

  const handleDragStart: DragEventHandler<HTMLElement> = (e, info) => {
    const node = ref.current
    if (!node) return

    startEvent.current = e

    // node.setPointerCapture(e.pointerId)

    isDragging.set(true)

    onDragStart?.(e, info)
  }

  const handleDrag: DragEventHandler = (e, info) => {
    const node = ref.current
    if (!node) return

    const curY = y.get()
    const curNumberY = isNumber(curY) ? curY : getNumberY() // TODO use cssToPx

    // Constraints
    if (!constraints) {
      y.set(curNumberY + info.delta)
    } else {
      const min = getConstraint(constraints[ConstraintType.Min], node)
      const max = getConstraint(constraints[ConstraintType.Max], node)

      const newUndumpedY = getUndumpedValue(curNumberY, min, max) + info.delta

      y.set(getDumpedValue(newUndumpedY, min, max))

      if (newUndumpedY <= min) onConstraint?.(ConstraintType.Min)
      if (newUndumpedY >= max) onConstraint?.(ConstraintType.Max)
    }

    onDragMove?.(e, info)
  }

  const handleDragEnd: DragEventHandler<HTMLElement> = (e, info) =>
    onDragEnd?.(e, info)

  const resetVariables = () => {
    wantToDrag.set(false)
    isDragging.set(false)
    startEvent.current = null
    initY.current = null
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (wantToDrag.get()) return

    last.current = e.screenY
    lastTime.current = e.timeStamp

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

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const delta = e.screenY - last.current
    const velocity = getVelocity(delta, e.timeStamp - lastTime.current)

    last.current = e.screenY
    lastTime.current = e.timeStamp
    lastVelocity.current = velocity

    if (!wantToDrag.get()) return

    const node = ref.current
    if (!node) return

    // Check controls
    if (dragControls.isLocked()) return

    // Runs once per drag
    if (!isDragging.get()) {
      const passed = shouldDrag(
        e.target as HTMLElement,
        node,
        delta > 0,
        e.pointerType === 'touch'
      )

      if (!passed) {
        resetVariables()

        // Resetting to the pos before trying to drag
        if (initY.current !== null) y.set(initY.current)

        return
      }

      handleDragStart(e, { delta, velocity })
    }

    handleDrag(e, { delta, velocity })
  }

  const handleRelease = (e: PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return

    const delta = e.screenY - last.current
    const timeDelta = e.timeStamp - lastTime.current

    // Sometimes the velocity is 0, even if in fact it's not
    const velocity = getVelocity(delta, timeDelta) || lastVelocity.current

    // Reset to constraints
    if (snapToConstraints && constraints && isNumber(y.get())) {
      const min = getConstraint(constraints[ConstraintType.Min], node)
      const max = getConstraint(constraints[ConstraintType.Max], node)
      y.set(clamp(min, max, y.get() as number)) // TODO use cssToPx
    }

    const wasDragging = isDragging.get()

    resetVariables()

    if (!wasDragging) return

    handleDragEnd(e, {
      delta,
      velocity
    })
  }

  return {
    wantToDrag,
    startEvent,
    ref,
    listeners: {
      onPointerDown,
      onPointerMove,
      onPointerUp: handleRelease,
      onPointerCancel: handleRelease
    }
  }
}
