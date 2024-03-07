'use client'

import React, { forwardRef, useEffect } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext } from '@/drawer/lib/hooks'
import { type Snap } from '@/drawer/lib/types'
import { mergeHandlers } from '@/shared/lib/helpers'
import { useSetStyle } from '@/shared/lib/hooks'
import {
  type DragProps,
  Draggable,
  type DraggableProps
} from '@/shared/ui/draggable'

import { getMinConstraint, transformTemplate } from '../lib/helpers'
import { useDragEvents, useSnapTo, useSnapToCurrent } from '../lib/hooks'

type PickedProps = 'onDragStart' | 'onDragEnd' | 'onDragMove' | 'onConstraint'

export interface SheetProps
  extends Omit<DraggableProps<Snap>, keyof DragProps<Snap>>,
    Pick<DragProps<Snap>, PickedProps> {}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  (
    { onConstraint, onPointerUp, onPointerCancel, onDragEnd, ...props },
    forwardedRef
  ) => {
    const {
      open,
      onOpenChange,
      drawerControls,
      snapPoints,
      snap,
      onSnapChange,
      dismissible,
      drawerRef: contextRef,
      scrollLockTimeout,
      onDrawerConstraint,
      velocityMultiplier,
      elasticity
    } = useDrawerContext()

    const { locked } = drawerControls

    const firstPoint = snapPoints[0]

    const snapTo = useSnapTo(drawerControls.y)

    const { drawerRef, listeners } = useDragEvents<HTMLDivElement>({
      snapPoints,
      snapTo,
      snap,
      onSnapChange,
      onClose: () => onOpenChange(false),
      dismissible,
      locked,
      velocityMultiplier
    })

    const { handleDragEnd, handleRelease } = listeners

    const composedRef = useComposedRefs(drawerRef, forwardedRef, contextRef)

    const [setStyle, resetStyle] = useSetStyle(drawerRef)

    useSnapToCurrent(snapTo, snap, open)

    useEffect(() => {
      if (open) resetStyle('pointerEvents')
      else setStyle({ pointerEvents: 'none' })
    }, [open])

    return (
      <Draggable
        ref={composedRef}
        dragControls={drawerControls}
        transformTemplate={transformTemplate}
        constraints={{
          min: (el) => getMinConstraint(el, snapPoints),
          max: (el) => (dismissible ? 0 : -cssToPx(firstPoint, el))
        }}
        scrollLockTimeout={scrollLockTimeout}
        onConstraint={(e, type) => {
          onConstraint?.(e, type)
          return onDrawerConstraint(e, type)
        }}
        onDragEnd={mergeHandlers(handleDragEnd, onDragEnd)}
        onPointerUp={mergeHandlers(handleRelease, onPointerUp)}
        onPointerCancel={mergeHandlers(handleRelease, onPointerCancel)}
        elasticity={elasticity}
        {...props}
      />
    )
  }
)

Sheet.displayName = 'Drawer.Sheet'
