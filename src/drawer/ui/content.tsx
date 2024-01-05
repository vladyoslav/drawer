import React, { forwardRef } from 'react'

import {
  Content as ContentPrimitive,
  type DialogContentProps as ContentPrimitiveProps
} from '@radix-ui/react-dialog'
import { AnimatePresence } from 'framer-motion'

import { useDrawerContext } from '../lib/hooks'
import { type WithoutMotionProps } from '../lib/types'
import { Sheet, type SheetProps } from './sheet'

export interface ContentProps
  extends Omit<SheetProps, 'onClose'>,
    WithoutMotionProps<Omit<ContentPrimitiveProps, 'forceMount' | 'asChild'>> {}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (
    {
      onOpenAutoFocus,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onInteractOutside,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange } = useDrawerContext()

    const primitiveProps = {
      onOpenAutoFocus,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onInteractOutside
    }

    return (
      <AnimatePresence>
        {open && (
          <ContentPrimitive
            ref={ref}
            forceMount
            asChild
            {...primitiveProps}
            vladyoslav-drawer=""
          >
            <Sheet {...props} onClose={() => onOpenChange(false)} />
          </ContentPrimitive>
        )}
      </AnimatePresence>
    )
  }
)

Content.displayName = 'Drawer.Content'
