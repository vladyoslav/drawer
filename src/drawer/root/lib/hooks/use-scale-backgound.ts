import { type RefObject } from 'react'

import { cssToPx } from '@/drawer/lib/helpers'
import { type Snap } from '@/drawer/lib/types'
import { resetStyle, setStyle } from '@/shared/lib/helpers'
import { useValueChange } from '@/shared/lib/hooks'
import { type DragControls } from '@/shared/ui/draggable'

export const useScaleBackgound = (
  drawerControls: DragControls<Snap>,
  drawerRef: RefObject<HTMLDivElement>,
  snapPoints: Snap[],
  shouldScaleBackground: boolean,
  scaleFrom: Snap
) => {
  const lastPoint = snapPoints[snapPoints.length - 1]

  const getWrapper = () => document.querySelector('[vladyoslav-drawer-wrapper]')

  useValueChange(drawerControls.y, (latest) => {
    if (!shouldScaleBackground) return

    const node = drawerRef.current
    if (!node) return

    const wrapper = getWrapper()
    if (!wrapper) return

    const y = cssToPx(latest, node)
    const scaleFromY = cssToPx(scaleFrom, node)
    const multiplier = Math.max(
      (-y - scaleFromY) / (cssToPx(lastPoint, node) - scaleFromY),
      0
    )

    const width = (wrapper as HTMLElement).offsetWidth

    const transform =
      `scale(calc(1 - ((2 * var(--offset)) / ${width}) * ${multiplier})) ` +
      `translate3d(0, calc(env(safe-area-inset-top) + (var(--offset) * 1px) * ${multiplier}), 0)`

    const borderRadius = `calc(var(--border-radius) * ${multiplier})`

    setStyle(wrapper as HTMLElement, { transform, borderRadius })
  })

  useValueChange(drawerControls.isDragging, (latest) => {
    if (!shouldScaleBackground) return

    const wrapper = getWrapper()
    if (!wrapper) return

    if (latest) setStyle(wrapper as HTMLElement, { transition: 'none' })
    else resetStyle(wrapper as HTMLElement, 'transition')
  })
}
