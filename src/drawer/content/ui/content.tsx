import React, { forwardRef } from 'react'

import {
  Content as ContentPrimitive,
  type DialogContentProps as ContentPrimitiveProps
} from '@radix-ui/react-dialog'

import { useDrawerContext } from '@/drawer/lib/hooks'

import { Sheet, type SheetProps } from './sheet'

export interface ContentProps
  extends Omit<SheetProps, 'onClose'>,
    Omit<ContentPrimitiveProps, 'forceMount' | 'asChild'> {}

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
    const { onOpenChange, modal, drawerControls } = useDrawerContext()

    const primitiveProps = {
      onOpenAutoFocus,
      onCloseAutoFocus,
      onPointerDownOutside
    }

    return (
      <ContentPrimitive
        ref={ref}
        asChild
        {...primitiveProps}
        vladyoslav-drawer=""
        onEscapeKeyDown={(e) => {
          if (drawerControls.isDragging.get()) return e.preventDefault()
          if (!modal) e.preventDefault()
          onEscapeKeyDown?.(e)
        }}
        onInteractOutside={(e) => {
          if (!modal) e.preventDefault()
          onInteractOutside?.(e)
        }}
      >
        <Sheet {...props} onClose={() => onOpenChange(false)} />
      </ContentPrimitive>
    )
  }
)

Content.displayName = 'Drawer.Content'
