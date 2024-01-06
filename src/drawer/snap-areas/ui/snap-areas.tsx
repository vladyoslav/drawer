import React, { forwardRef } from 'react'

import { useDrawerContext } from '@/lib/hooks'

import { Areas } from './areas'
import { Lines } from './lines'

export const SnapAreas = forwardRef<HTMLDivElement, {}>(({ ...props }, ref) => {
  const { open } = useDrawerContext()

  if (!open) return null

  return (
    <div
      ref={ref}
      vladyoslav-drawer-snap-areas=""
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column-reverse',
        pointerEvents: 'none'
      }}
      {...props}
    >
      <Lines />
      <Areas />
    </div>
  )
})

SnapAreas.displayName = 'Drawer.SnapAreas'
