'use client'

import React, { forwardRef } from 'react'

import {
  Content as ContentPrimitive,
  type DialogContentProps as ContentPrimitiveProps
} from '@radix-ui/react-dialog'

import { useDrawerContext } from '@/drawer/lib/hooks'

import { Sheet, type SheetProps } from './sheet'

export interface ContentProps
  extends Omit<ContentPrimitiveProps, keyof SheetProps>,
    SheetProps {}

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
    const { modal, drawerControls, dismissible } = useDrawerContext()

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
          if (!modal || !dismissible) e.preventDefault()
          onEscapeKeyDown?.(e)
        }}
        onInteractOutside={(e) => {
          if (!modal || !dismissible) e.preventDefault()
          onInteractOutside?.(e)
        }}
      >
        <Sheet {...props} />
      </ContentPrimitive>
    )
  }
)

Content.displayName = 'Drawer.Content'
