import { useRef } from 'react'

import { type PanInfo } from 'framer-motion'

import { clamp } from '@/lib/helpers'
import { type SetSnap, type Snap } from '@/lib/types'

import { type MotionEvent } from '../../types'
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

  const onDragEnd = (_: MotionEvent, { velocity }: PanInfo) => {
    setIsDragging(false)

    const node = drawerRef.current

    if (!node) return

    const rect = node.getBoundingClientRect()
    const pos = window.innerHeight - rect.y

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
