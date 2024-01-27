'use client'

import React, { forwardRef, useEffect } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext } from '@/drawer/lib/hooks'
import { type Snap } from '@/drawer/lib/types'
import { mergeHandlers } from '@/shared/lib/helpers'
import { useSetStyle } from '@/shared/lib/hooks'
import { Draggable, type DraggableProps } from '@/shared/ui/draggable'

import { getMinConstraint, transformTemplate } from '../lib/helpers'
import { useDragEvents, useSnapTo, useSnapToCurrent } from '../lib/hooks'

export interface SheetProps extends DraggableProps<Snap> {}

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
      setSnap,
      dismissible,
      drawerRef: contextRef,
      scrollLockTimeout,
      onDrawerConstraint
    } = useDrawerContext()

    const { locked } = drawerControls

    const firstPoint = snapPoints[0]

    const snapTo = useSnapTo(drawerControls.y)

    const { drawerRef, listeners } = useDragEvents<HTMLDivElement>({
      snapPoints,
      snapTo,
      snap,
      setSnap,
      onClose: () => onOpenChange(false),
      dismissible,
      locked
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
        {...props}
      />
    )
  }
)

Sheet.displayName = 'Drawer.Sheet'
