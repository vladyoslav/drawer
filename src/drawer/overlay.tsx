import React, { type HTMLProps, type PropsWithoutRef, forwardRef } from 'react'

import { Overlay as OverlayPrimitive } from '@radix-ui/react-dialog'
import { AnimatePresence, type MotionProps, motion } from 'framer-motion'

import { useDrawerContext } from '@/drawer/lib/hooks'
import { type WithoutMotionProps } from '@/drawer/lib/types'

export interface OverlayProps
  extends PropsWithoutRef<WithoutMotionProps<HTMLProps<HTMLDivElement>>>,
    MotionProps {}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ ...props }, ref) => {
    const { y, open, drawerRef } = useDrawerContext()

    return (
      <AnimatePresence>
        {open && (
          <OverlayPrimitive ref={ref} asChild forceMount>
            <motion.div
              {...props}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </OverlayPrimitive>
        )}
      </AnimatePresence>
    )
  }
)

Overlay.displayName = 'Drawer.Overlay'
