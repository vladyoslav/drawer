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

    if (newSnap === 0) return onClose()

    // Content is scrolled down, should not snap
    if (node.scrollTop !== 0 && e.pointerType === 'touch') return

    setSnap(newSnap)
  }

  const handleRelease = () => snapTo(snap)

  return {
    drawerRef,
    listeners: {
      onDragEnd,
      onPointerUp: handleRelease,
      onPointerCancel: handleRelease
    }
  }
}
