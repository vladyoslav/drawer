import React, { forwardRef } from 'react'

import { AnimatePresence } from 'framer-motion'

import { useDrawerContext } from '../lib/hooks'
import { Sheet, type SheetProps } from './sheet'

export interface ContentProps extends Omit<SheetProps, 'onClose'> {}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ ...props }, ref) => {
    const { open, onOpenChange } = useDrawerContext()

    return (
      <AnimatePresence>
        {open && (
          <Sheet ref={ref} {...props} onClose={() => onOpenChange(false)} />
        )}
      </AnimatePresence>
    )
  }
)

Content.displayName = 'Drawer.Content'
