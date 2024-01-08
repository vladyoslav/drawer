import React, { type HTMLProps, forwardRef } from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { usePresence } from 'framer-motion'

import { useDrawerContext } from '@/drawer/lib/hooks'
import { Draggable } from '@/shared/ui/draggable'

import { transformTemplate } from '../lib/helpers'
import {
  useDragEvents,
  useSafeRemove,
  useSnapTo,
  useSnapToCurrent
} from '../lib/hooks'

export interface SheetProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'onDragStart' | 'onDragEnd'> {
  onClose: () => void
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  ({ onClose, ...props }, forwardedRef) => {
    const {
      y,
      snapPoints,
      snap,
      setSnap,
      dismissible,
      drawerRef: contextRef
    } = useDrawerContext()

    const snapTo = useSnapTo(y)

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

    const [isPresent, safeToRemove] = usePresence()

    useSnapToCurrent(snapTo, snap, isPresent)

    const transitionListeners = useSafeRemove(isPresent, safeToRemove)

    return (
      <Draggable
        ref={composedRef}
        y={y}
        transformTemplate={transformTemplate}
        // constraints={{
        //   min: (el) => -el.getBoundingClientRect().height,
        //   max: 0.001 // fixing no transition when y = 0, this can be done much better
        // }}
        onDragMove={() => console.log('drag')}
        onDragStart={() => console.log('start')}
        {...dragListeners}
        {...transitionListeners}
        {...props}
      />
    )
  }
)

Sheet.displayName = 'Drawer.Sheet'
