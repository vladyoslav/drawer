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
import { useControlsState, useDraggable, useLockScrollable } from '../lib/hooks'
import {
  type ConstraintEventHandler,
  type Constraints,
  type DragControls,
  type DragEventHandler,
  type TransformTemplate
} from '../lib/types'
import './draggable.css'

export interface DraggableProps<T>
  extends Omit<
    HTMLProps<HTMLDivElement>,
    'ref' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  dragControls?: DragControls<T>
  constraints?: Constraints
  onConstraint?: ConstraintEventHandler
  onDragStart?: DragEventHandler
  onDragMove?: DragEventHandler
  onDragEnd?: DragEventHandler
  transformTemplate?: TransformTemplate
  snapToConstraints?: boolean
  scrollLockTimeout?: number
}

const _Draggable = <T,>(
  {
    constraints,
    dragControls: cDragControls,
    onConstraint,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onDragStart,
    onDragMove,
    onDragEnd,
    transformTemplate = defaultTransformTemplate,
    snapToConstraints = true,
    scrollLockTimeout = 0,
    ...props
  }: DraggableProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const dragControls = useControlsState(cDragControls)
  const { y, isDragging } = dragControls

  const { ref, startEvent, wantToDrag, listeners } = useDraggable({
    dragControls,
    constraints,
    onConstraint,
    onDragStart,
    onDragMove,
    onDragEnd,
    transformTemplate,
    snapToConstraints,
    scrollLockTimeout
  })

  const { handlePointerDown, handlePointerMove, handleRelease } = listeners

  const composedRef = useComposedRefs(ref, forwardedRef)

  const [setStyle, resetStyle] = useSetStyle(ref)
  const [lockScrollable, unlockScrollable] = useLockScrollable(ref)

  useValueChange(y, (latest) => {
    setStyle({ transform: transformTemplate(latest) })
  })

  useValueChange(wantToDrag, (latest) => {
    if (latest) setStyle({ transition: 'none' })
    else resetStyle('transition')
  })

  useValueChange(isDragging, (latest) => {
    const e = startEvent.current
    if (!e) return
    if (e.pointerType !== 'touch') return

    if (latest) lockScrollable(e.target as HTMLElement)
    else unlockScrollable(e.target as HTMLElement)
  })

  return (
    <div
      vladyoslav-drawer-draggable=""
      draggable="false"
      ref={composedRef}
      onPointerDown={mergeHandlers(handlePointerDown, onPointerDown)}
      onPointerMove={mergeHandlers(handlePointerMove, onPointerMove)}
      onPointerUp={mergeHandlers(handleRelease, onPointerUp)}
      onPointerCancel={mergeHandlers(handleRelease, onPointerCancel)}
      {...props}
    />
  )
}

export const Draggable = forwardRef(_Draggable) as <T>(
  props: DraggableProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
