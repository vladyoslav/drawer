import React, { type HTMLProps, forwardRef, useEffect } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext } from '@/drawer/lib/hooks'
import { useSetStyle } from '@/shared/lib/hooks'
import { Draggable } from '@/shared/ui/draggable'

import { getMinConstraint, transformTemplate } from '../lib/helpers'
import { useDragEvents, useSnapTo, useSnapToCurrent } from '../lib/hooks'

export interface SheetProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'onDragStart' | 'onDragEnd'> {
  onClose: () => void
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  ({ onClose, ...props }, forwardedRef) => {
    const {
      open,
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

    const { drawerRef, listeners: dragListeners } =
      useDragEvents<HTMLDivElement>({
        snapPoints,
        snapTo,
        snap,
        setSnap,
        onClose,
        dismissible,
        locked
      })

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
        onConstraint={onDrawerConstraint}
        scrollLockTimeout={scrollLockTimeout}
        {...dragListeners}
        {...props}
      />
    )
  }
)

Sheet.displayName = 'Drawer.Sheet'
