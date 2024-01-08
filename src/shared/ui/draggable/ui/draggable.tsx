import React, {
  type ForwardedRef,
  type HTMLProps,
  type ReactElement,
  type Ref,
  forwardRef,
  useLayoutEffect
} from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { mergeHandlers } from '@/shared/lib/helpers'
import { useValueChange } from '@/shared/lib/hooks'
import { type Value } from '@/shared/lib/types'

import { defaultTransformTemplate } from '../lib/helpers'
import { useDraggable, useSetStyle, useY } from '../lib/hooks'
import {
  type ConstraintType,
  type Constraints,
  type DragControls,
  type DragEventHandler,
  type TransformTemplate
} from '../lib/types'

export interface DraggableProps<T>
  extends Omit<
    HTMLProps<HTMLDivElement>,
    'ref' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  dragControls?: DragControls
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
  y?: Value<T>
  onDragStart?: DragEventHandler
  onDragMove?: DragEventHandler
  onDragEnd?: DragEventHandler
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
    onDragMove,
    onDragEnd,
    transformTemplate = defaultTransformTemplate,
    ...props
  }: DraggableProps<number | T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const y = useY(0, cY)

  const { ref, isDragging, listeners } = useDraggable({
    y,
    dragControls,
    constraints,
    onConstraint,
    onDragStart,
    onDragMove,
    onDragEnd
  })

  const {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel
  } = listeners

  const composedRef = useComposedRefs(ref, forwardedRef)

  const [setStyle, resetStyle] = useSetStyle(ref)

  // Fixing initial opening animation
  useLayoutEffect(() => {
    setStyle({ transform: transformTemplate(y.get()) })
  }, [])

  useValueChange(y, (latest) => {
    setStyle({ transform: transformTemplate(latest) })
  })

  useValueChange(isDragging, (latest) => {
    if (latest) setStyle({ transition: 'none' })
    else resetStyle('transition')
  })

  return (
    <div
      ref={composedRef}
      onPointerDown={mergeHandlers(handlePointerDown, onPointerDown)}
      onPointerMove={mergeHandlers(handlePointerMove, onPointerMove)}
      onPointerUp={mergeHandlers(handlePointerUp, onPointerUp)}
      onPointerCancel={mergeHandlers(handlePointerCancel, onPointerCancel)}
      {...props}
    />
  )
}

export const Draggable = forwardRef(_Draggable) as <T>(
  props: DraggableProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
