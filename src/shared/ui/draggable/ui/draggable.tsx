import React, {
  type ForwardedRef,
  type HTMLProps,
  type ReactElement,
  type Ref,
  forwardRef
} from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { mergeHandlers } from '@/shared/lib/helpers'
import { useSetStyle, useValueChange } from '@/shared/lib/hooks'

import { defaultTransformTemplate } from '../lib/helpers'
import { useDraggable, useLockScrollable } from '../lib/hooks'
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
  dragControls?: DragControls<T>
  constraints?: Constraints
  onConstraint?: (type: ConstraintType) => void
  onDragStart?: DragEventHandler
  onDragMove?: DragEventHandler
  onDragEnd?: DragEventHandler
  transformTemplate?: TransformTemplate
}

const _Draggable = <T,>(
  {
    constraints,
    dragControls,
    onConstraint,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    onDragStart,
    onDragMove,
    onDragEnd,
    transformTemplate = defaultTransformTemplate,
    ...props
  }: DraggableProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const { ref, target, y, wantToDrag, isDragging, listeners } = useDraggable({
    dragControls,
    constraints,
    onConstraint,
    onDragStart,
    onDragMove,
    onDragEnd,
    transformTemplate
  })

  const {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel
  } = listeners

  const composedRef = useComposedRefs(ref, forwardedRef)

  const [setStyle, resetStyle] = useSetStyle(ref)
  const [lockScrollable, unlockScrollable] = useLockScrollable(ref, target)

  useValueChange(y, (latest) => {
    setStyle({ transform: transformTemplate(latest) })
  })

  useValueChange(wantToDrag, (latest) => {
    if (latest) setStyle({ transition: 'none' })
    else resetStyle('transition')
  })

  useValueChange(isDragging, (latest) => {
    if (latest) lockScrollable()
    else unlockScrollable()
  })

  return (
    <div
      ref={composedRef}
      // onPointerDown={mergeHandlers(handlePointerDown, onPointerDown)}
      // onPointerMove={mergeHandlers(handlePointerMove, onPointerMove)}
      // onPointerUp={mergeHandlers(handlePointerUp, onPointerUp)}
      // onPointerCancel={mergeHandlers(handlePointerCancel, onPointerCancel)}
      onTouchStart={mergeHandlers(handleTouchStart, onTouchStart)}
      onTouchMove={mergeHandlers(handleTouchMove, onTouchMove)}
      onTouchEnd={mergeHandlers(handleTouchEnd, onTouchEnd)}
      onTouchCancel={mergeHandlers(handleTouchCancel, onTouchCancel)}
      {...props}
    />
  )
}

export const Draggable = forwardRef(_Draggable) as <T>(
  props: DraggableProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
