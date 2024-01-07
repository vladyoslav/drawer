import React, {
  type HTMLProps,
  type PropsWithoutRef,
  forwardRef,
  useState
} from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { type MotionProps, motion, usePresence } from 'framer-motion'

import { useDrawerContext } from '@/drawer/lib/hooks'
import { type WithoutMotionProps } from '@/drawer/lib/types'

import { transformTemplate } from '../lib/helpers'
import { useDragEvents, useSafeRemove, useSnapToCurrent } from '../lib/hooks'

export interface SheetProps
  extends PropsWithoutRef<WithoutMotionProps<HTMLProps<HTMLDivElement>>>,
    MotionProps {
  onClose: () => void
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  ({ onClose, style, ...props }, forwardedRef) => {
    const {
      y,
      snapPoints,
      snap,
      setSnap,
      dismissible,
      drawerRef: contextRef
    } = useDrawerContext()

    const [isDragging, setIsDragging] = useState(false)

    const { drawerRef, listeners: dragListeners } =
      useDragEvents<HTMLDivElement>(
        snapPoints,
        setIsDragging,
        setSnap,
        onClose,
        dismissible
      )

    const composedRef = useComposedRefs(drawerRef, forwardedRef, contextRef)

    const [isPresent, safeToRemove] = usePresence()

    useSnapToCurrent(y, snap, isPresent, isDragging)

    const transitionListeners = useSafeRemove(isPresent, safeToRemove)

    return (
      <motion.div
        ref={composedRef}
        transformTemplate={transformTemplate}
        drag="y"
        dragMomentum={false}
        style={{
          y,
          transition: isDragging ? 'none' : undefined,
          ...style
        }}
        onDragStart={() => setIsDragging(true)}
        {...dragListeners}
        {...transitionListeners}
        {...props}
      />
    )
  }
)

Sheet.displayName = 'Drawer.Sheet'
