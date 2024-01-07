import React, {
  type HTMLProps,
  type PointerEvent,
  forwardRef,
  useRef
} from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { clamp, mergeHandlers } from '@/shared/lib/helpers'

import { getConstraint } from '../lib/helpers'
import { useValue, useValueChange } from '../lib/hooks'
import {
  ConstraintType,
  type Constraints,
  type DragControls
} from '../lib/types'

export interface DraggableProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'controls'> {
  controls?: DragControls
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
}

export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  (
    {
      constraints,
      controls,
      onConstraint,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const y = useValue(0)

    const last = useRef(0)

    const isDragging = useRef(false)

    const ref = useRef<HTMLDivElement>(null)
    const composedRef = useComposedRefs(ref, forwardedRef)

    const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
      if (isDragging.current) return

      last.current = e.screenY
      isDragging.current = true

      ref.current?.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
      const delta = e.screenY - last.current

      last.current = e.screenY

      if (!isDragging.current) return
      if (controls && !controls.canDrag()) return

      const newY = y.get() + delta

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
      isDragging.current = false
    }

    const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
      isDragging.current = false
    }

    useValueChange(y, (latest) => {
      const node = ref.current
      if (!node) return

      node.style.transform = `translate3d(0, ${latest}px, 0)`
    })

    return (
      <div
        ref={composedRef}
        style={{ touchAction: 'none', ...style }}
        onPointerDown={mergeHandlers(handlePointerDown, onPointerDown)}
        onPointerMove={mergeHandlers(handlePointerMove, onPointerMove)}
        onPointerUp={mergeHandlers(handlePointerUp, onPointerUp)}
        onPointerCancel={mergeHandlers(handlePointerCancel, onPointerCancel)}
        {...props}
      />
    )
  }
)

Draggable.displayName = 'Draggable'
