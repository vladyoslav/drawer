import { useRef } from 'react'

import { type PanInfo } from 'framer-motion'

import { clamp } from '../../helpers'
import { type MotionEvent, type SetSnap, type Snap } from '../../types'
import { useGetSnap } from './use-get-snap'

export const useDragEvents = <T extends HTMLElement>(
  snapPoints: Snap[],
  setIsDragging: (value: boolean) => void,
  setSnap: SetSnap,
  onClose: () => void,
  dismissible: boolean
) => {
  const drawerRef = useRef<T>(null)

  const dismissablePoints = dismissible ? [0, ...snapPoints] : snapPoints
  const getSnap = useGetSnap(dismissablePoints, drawerRef)

  const onDragEnd = ({ target }: MotionEvent, { point, velocity }: PanInfo) => {
    setIsDragging(false)

    if (!target) return

    const node = target as HTMLElement
    const rect = node.getBoundingClientRect()
    const pos = window.innerHeight - (rect.y || point.y)

    let newSnap = getSnap(pos)

    if (Math.abs(velocity.y) > 300) {
      const curIndex = dismissablePoints.indexOf(newSnap)
      const newIndex = curIndex + (velocity.y < 0 ? 1 : -1)
      const clampedIndex = clamp(0, dismissablePoints.length - 1, newIndex)

      newSnap = dismissablePoints[clampedIndex]
    }

    if (newSnap === 0) return onClose()

    setSnap(newSnap)
  }

  return { drawerRef, listeners: { onDragEnd } }
}
