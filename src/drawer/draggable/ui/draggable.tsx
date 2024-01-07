import React, {
  type HTMLProps,
  type PointerEvent,
  forwardRef,
  useRef
} from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { clamp, mergeHandlers } from '@/lib/helpers'

import { type DragControls, useValue, useValueChange } from '../lib/hooks'

interface DraggableProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'controls'> {
  controls?: DragControls
}

export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  (
    {
      controls,
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
      last.current = e.screenY
      isDragging.current = true

      ref.current?.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
      const delta = e.screenY - last.current

      last.current = e.screenY

      if (!isDragging.current) return
      if (controls && !controls.canDrag()) return

      const node = ref.current

      if (!node) return

      const nodeHeight = node.getBoundingClientRect().height

      const parentHeight = (
        node.parentNode as HTMLElement
      ).getBoundingClientRect().height

      y.set(clamp(parentHeight - nodeHeight, 0, y.get() + delta))
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
