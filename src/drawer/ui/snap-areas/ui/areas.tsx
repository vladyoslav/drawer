import React, { type FC } from 'react'

import { getSnapAreas } from '../../../lib/helpers'
import { useDrawerContext } from '../../../lib/hooks'
import { COLORS } from '../lib/constants'
import { useMounted } from '../lib/hooks'
import { type DrawerRefProp } from '../lib/types'

export const Areas: FC<DrawerRefProp> = ({ drawerRef }) => {
  const { snapPoints, dismissible } = useDrawerContext()

  const dismissiblePoints = dismissible ? [0, ...snapPoints] : snapPoints

  const mounted = useMounted()

  if (!mounted) return null

  const snapAreas = getSnapAreas(dismissiblePoints, drawerRef.current)

  const [_, snapHeights] = snapAreas.reduce<[number, number[]]>(
    ([prev, acc], cur) => [cur, [...acc, cur - prev]],
    [0, []]
  )

  return [...snapHeights, `100%`].map((height, index) => (
    <div
      key={height}
      vladyoslav-drawer-area=""
      style={{
        flexShrink: 0,
        background: COLORS[index % COLORS.length],
        opacity: 0.4,
        height
      }}
    />
  ))
}
