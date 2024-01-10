import React, { type HTMLProps, forwardRef, useEffect } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { cssToPx } from '@/drawer/lib/helpers'
import { useDrawerContext } from '@/drawer/lib/hooks'
import { useSetStyle } from '@/shared/lib/hooks'
import { Draggable } from '@/shared/ui/draggable'

import { transformTemplate } from '../lib/helpers'
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
      drawerRef: contextRef
    } = useDrawerContext()

    const lastPoint = snapPoints[snapPoints.length - 1]
    const firstPoint = snapPoints[0]

    const snapTo = useSnapTo(drawerControls.y)

    const { drawerRef, listeners: dragListeners } =
      useDragEvents<HTMLDivElement>(
        snapPoints,
        snapTo,
        snap,
        setSnap,
        onClose,
        dismissible
      )

    const composedRef = useComposedRefs(drawerRef, forwardedRef, contextRef)

    const [setStyle] = useSetStyle(drawerRef)

    useSnapToCurrent(snapTo, snap, open)

    useEffect(() => {
      if (open) return
      if (!drawerRef.current) return

      setStyle({ pointerEvents: 'none' })
    }, [open])

    return (
      <Draggable
        ref={composedRef}
        dragControls={drawerControls}
        transformTemplate={transformTemplate}
        constraints={{
          min: (el) => -cssToPx(lastPoint, el),
          max: (el) => -cssToPx(firstPoint, el)
        }}
        // onDragMove={() => console.log('drag')}
        // onDragStart={() => console.log('start')}
        {...dragListeners}
        {...props}
      />
    )
  }
)

Sheet.displayName = 'Drawer.Sheet'
