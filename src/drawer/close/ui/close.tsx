'use client'

import React, { forwardRef } from 'react'

import {
  Close as ClosePrimitive,
  type DialogCloseProps as ClosePrimitiveProps
} from '@radix-ui/react-dialog'

import { useDrawerContext } from '@/drawer/lib/hooks'

export interface CloseProps extends ClosePrimitiveProps {}

export const Close = forwardRef<HTMLButtonElement, CloseProps>(
  ({ onClick, ...props }, ref) => {
    const { dismissible } = useDrawerContext()

    return (
      <ClosePrimitive
        ref={ref}
        onClick={(e) => {
          if (!dismissible) e.preventDefault()

          onClick?.(e)
        }}
        {...props}
      />
    )
  }
)

Close.displayName = 'Drawer.Close'
