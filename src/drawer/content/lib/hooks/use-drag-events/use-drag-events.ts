import { useRef } from 'react'

import { type SetSnap, type Snap } from '@/drawer/lib/types'
import { type DragEventHandler } from '@/shared/ui/draggable'

import { type SnapTo } from '../../types'
import { useGetSnap } from './use-get-snap'

export const useDragEvents = <T extends HTMLElement>(
  snapPoints: Snap[],
  snapTo: SnapTo,
  snap: Snap,
  setSnap: SetSnap,
  onClose: () => void,
  dismissible: boolean
) => {
  const drawerRef = useRef<T>(null)

  const dismissablePoints = dismissible ? [0, ...snapPoints] : snapPoints
  const getSnap = useGetSnap(dismissablePoints, drawerRef)

  const onDragEnd: DragEventHandler = (e, { velocity }) => {
    const node = drawerRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const pos = window.innerHeight - rect.y

    // Definitely not undefined, because we checked the drawerRef.current earlier
    let newSnap = getSnap(pos, velocity)!
    // if (Math.abs(velocity.y) > 300) {
    //   const curIndex = dismissablePoints.indexOf(newSnap)
    //   const newIndex = curIndex + (velocity.y < 0 ? 1 : -1)
    //   const clampedIndex = clamp(0, dismissablePoints.length - 1, newIndex)
    //
    //   newSnap = dismissablePoints[clampedIndex]
    // }

    if (newSnap === 0) return onClose()

    if (snap === newSnap) return snapTo(snap)

    // Content is scrolled down, should not snap
    if (node.scrollTop !== 0 && e.pointerType === 'touch') return snapTo(snap)

    setSnap(newSnap)
  }

  return { drawerRef, listeners: { onDragEnd } }
}
