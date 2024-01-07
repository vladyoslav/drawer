import React, {
  type ForwardedRef,
  type HTMLProps,
  type PointerEvent,
  type PointerEventHandler,
  type ReactElement,
  type Ref,
  forwardRef,
  useLayoutEffect,
  useRef
} from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { clamp, mergeHandlers } from '@/shared/lib/helpers'
import { useValue, useValueChange } from '@/shared/lib/hooks'
import { type Value } from '@/shared/lib/types'

import { defaultTransformTemplate, getConstraint } from '../lib/helpers'
import { useY } from '../lib/hooks'
import {
  ConstraintType,
  type Constraints,
  type DragControls,
  type TransformTemplate
} from '../lib/types'

export interface DraggableProps<T>
  extends Omit<
    HTMLProps<HTMLDivElement>,
    'ref' | 'controls' | 'onDragStart' | 'onDragEnd'
  > {
  dragControls?: DragControls
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
  y?: Value<T>
  onDragStart?: PointerEventHandler
  onDragEnd?: PointerEventHandler
  transformTemplate?: TransformTemplate
}

const _Draggable = <T,>(
  {
    y: cY,
    constraints,
    dragControls,
    onConstraint,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onDragStart,
    onDragEnd,
    transformTemplate = defaultTransformTemplate,
    style,
    ...props
  }: DraggableProps<number | T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const y = useY(0, cY)

  const last = useRef(0)

  const isDragging = useValue(false)

  const ref = useRef<HTMLDivElement>(null)
  const composedRef = useComposedRefs(ref, forwardedRef)

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging.get()) return

    last.current = e.screenY

    const node = ref.current
    if (!node) return

    node.setPointerCapture(e.pointerId)

    const curRect = node.getBoundingClientRect()

    // turning off transition
    isDragging.set(true)

    // resetting y, but not firing useValueChange
    node.style.transform = transformTemplate(0)
    const initRect = node.getBoundingClientRect()

    y.set(curRect.y - initRect.y)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
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

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.set(false)
  }

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.set(false)
  }

  // fixing initial opening animation
  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    node.style.transform = transformTemplate(y.get())
  }, [])

  useValueChange(y, (latest) => {
    const node = ref.current
    if (!node) return

    node.style.transform = transformTemplate(latest)
  })

  useValueChange(isDragging, (latest) => {
    const node = ref.current
    if (!node) return

    node.style.transition = latest ? 'none' : ''
  })

  return (
    <div
      ref={composedRef}
      style={{
        touchAction: 'none',
        ...style
      }}
      onPointerDown={mergeHandlers(
        handlePointerDown,
        onPointerDown,
        onDragStart
      )}
      onPointerMove={mergeHandlers(handlePointerMove, onPointerMove)}
      onPointerUp={mergeHandlers(handlePointerUp, onPointerUp, onDragEnd)}
      onPointerCancel={mergeHandlers(
        handlePointerCancel,
        onPointerCancel,
        onDragEnd
      )}
      {...props}
    />
  )
}

export const Draggable = forwardRef(_Draggable) as <T>(
  props: DraggableProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
