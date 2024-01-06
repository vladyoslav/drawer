import React, { type FC } from 'react'

import { cssToPx } from '@/lib/helpers'
import { useDrawerContext } from '@/lib/hooks'

import { COLORS } from '../lib/constants'
import { useMounted } from '../lib/hooks'

export const Lines: FC = () => {
  const { snapPoints, dismissible, drawerRef } = useDrawerContext()

  const mounted = useMounted()

  if (!mounted) return null

  const snapLines = (dismissible ? [0, ...snapPoints] : snapPoints).map(
    (point) => cssToPx(point, drawerRef.current)
  )

  return snapLines.map((line, index) => (
    <div
      key={line}
      vladyoslav-drawer-lines=""
      style={{
        left: 0,
        right: 0,
        position: 'fixed',
        borderTop: '1px dashed',
        borderColor: COLORS[index % COLORS.length],
        bottom: line
      }}
    />
  ))
}
