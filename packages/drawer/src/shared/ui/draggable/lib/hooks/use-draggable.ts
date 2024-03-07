import { type PointerEvent as ReactPointerEvent, useRef } from 'react'

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
  type ConstraintEventHandler,
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
  onConstraint?: ConstraintEventHandler
  onDragStart?: DragEventHandler
  onDragMove?: DragEventHandler
  onDragEnd?: DragEventHandler
  transformTemplate?: TransformTemplate
  scrollLockTimeout: number
  elasticity: number
}

export const useDraggable = <T>({
  dragControls,
  transformTemplate,
  constraints,
  onConstraint,
  onDragStart,
  onDragMove,
  onDragEnd,
  scrollLockTimeout,
  elasticity
}: DraggableOptions<T>) => {
  const { y, isDragging } = dragControls

  const last = useRef(0)
  const lastTime = useRef(0)
  const lastVelocity = useRef(0)

  const initTop = useRef(0)
  const initY = useRef<NumberOr<T> | null>(null)

  const wantToDrag = useValue(false)

  const ref = useRef<HTMLDivElement>(null)
  const [setStyle, resetStyle] = useSetStyle(ref)

  const lastTimePrevented = useRef(0)

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

    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)

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

      const newUndumpedY =
        getUndumpedValue(curNumberY, min, max, elasticity) + info.delta

      let proceed = true
      if (newUndumpedY <= min || newUndumpedY >= max) {
        const constraint =
          newUndumpedY <= min ? ConstraintType.Min : ConstraintType.Max

        const res = onConstraint?.(e, constraint)

        proceed = res === undefined || res
      }

      const newY = proceed
        ? getDumpedValue(newUndumpedY, min, max, elasticity)
        : clamp(min, max, newUndumpedY)

      y.set(newY)
    }

    onDragMove?.(e, info)
  }

  const handleDragEnd: DragEventHandler = (e, info) => onDragEnd?.(e, info)

  const resetVariables = () => {
    wantToDrag.set(false)
    isDragging.set(false)
    initY.current = null
  }

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return

    last.current = e.clientY
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

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return

    const delta = e.clientY - last.current
    const velocity = getVelocity(delta, e.timeStamp - lastTime.current)

    last.current = e.clientY
    lastTime.current = e.timeStamp
    lastVelocity.current = velocity

    if (!wantToDrag.get()) return

    const node = ref.current
    if (!node) return

    // Runs once per drag
    if (!isDragging.get()) {
      const passed = shouldDrag(
        e.target as HTMLElement,
        node,
        delta > 0,
        e.pointerType === 'touch'
      )

      const passedTimeout =
        e.timeStamp - lastTimePrevented.current >= scrollLockTimeout

      if (!passed || !passedTimeout) {
        resetVariables()

        lastTimePrevented.current = e.timeStamp

        // Resetting to the pos before trying to drag
        if (initY.current !== null) y.set(initY.current)

        return
      }

      handleDragStart(e, { delta, velocity })
    }

    // Check controls
    if (dragControls.locked.get()) return

    handleDrag(e, { delta, velocity })
  }

  const handleRelease = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return

    const node = ref.current
    if (!node) return

    const delta = e.clientY - last.current
    const timeDelta = e.timeStamp - lastTime.current

    // Sometimes the velocity is 0, even if in fact it's not
    const velocity = getVelocity(delta, timeDelta) || lastVelocity.current

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
    ref,
    listeners: {
      handlePointerDown,
      handlePointerMove,
      handleRelease
    }
  }
}
