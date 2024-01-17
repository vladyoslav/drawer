import { type RefObject } from 'react'

import { cssToPx } from '@/drawer/lib/helpers'
import { type Snap } from '@/drawer/lib/types'
import { clamp, resetStyle, setStyle } from '@/shared/lib/helpers'
import { useValueChange } from '@/shared/lib/hooks'
import { type DragControls } from '@/shared/ui/draggable'

export const useScaleBackgound = (
  open: boolean,
  drawerControls: DragControls<Snap>,
  drawerRef: RefObject<HTMLDivElement>,
  snapPoints: Snap[],
  scaleFromIndex?: number
) => {
  const lastPoint = snapPoints[snapPoints.length - 1]
  const scaleFrom =
    scaleFromIndex !== undefined ? snapPoints[scaleFromIndex] : 0

  const getWrapper = () => document.querySelector('[vladyoslav-drawer-wrapper]')

  useValueChange(drawerControls.y, (latest) => {
    const node = drawerRef.current
    if (!node) return

    const wrapper = getWrapper()
    if (!wrapper) return

    const y = cssToPx(latest, node)
    const scaleFromY = cssToPx(scaleFrom, node)
    const multiplier = clamp(
      0,
      1,
      (-y - scaleFromY) / (cssToPx(lastPoint, node) - scaleFromY)
    )

    const transform = `scale(calc(1 - 0.04 * ${multiplier}))`
    const borderRadius = `calc(var(--border-radius) * ${multiplier})`

    setStyle(wrapper as HTMLElement, { transform, borderRadius })
  })

  useValueChange(drawerControls.isDragging, (latest) => {
    const wrapper = getWrapper()
    if (!wrapper) return

    if (latest) setStyle(wrapper as HTMLElement, { transition: 'none' })
    else resetStyle(wrapper as HTMLElement, 'transition')
  })
}
