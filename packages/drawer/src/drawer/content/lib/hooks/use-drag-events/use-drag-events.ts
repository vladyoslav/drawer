import { type PointerEvent as ReactPointerEvent, useRef } from 'react'

import { type OnSnapChange, type Snap } from '@/drawer/lib/types'
import { type DrawerValue } from '@/shared/lib/classes'
import { type DragEventHandler } from '@/shared/ui/draggable'

import { type SnapTo } from '../../types'
import { useGetSnap } from './use-get-snap'

interface DragEventsOptions {
  snapPoints: Snap[]
  snapTo: SnapTo
  snap: Snap
  onSnapChange: OnSnapChange
  onClose: () => void
  dismissible: boolean
  locked: DrawerValue<boolean>
  velocityMultiplier: number
}

export const useDragEvents = <T extends HTMLElement>({
  snapPoints,
  snapTo,
  snap,
  onSnapChange,
  onClose,
  dismissible,
  locked,
  velocityMultiplier: velMult
}: DragEventsOptions) => {
  const drawerRef = useRef<T>(null)

  const dismissiblePoints = dismissible ? [0, ...snapPoints] : snapPoints
  const getSnap = useGetSnap(dismissiblePoints, drawerRef)

  const handleDragEnd: DragEventHandler = (e, { velocity }) => {
    const node = drawerRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const pos = window.innerHeight - rect.y

    // Definitely not undefined, because we checked the drawerRef.current earlier
    let newSnap = getSnap(pos, locked.get() ? 0 : velocity * velMult)!

    if (newSnap === 0) return onClose()

    onSnapChange(newSnap)
  }

  const handleRelease = (e: ReactPointerEvent<HTMLDivElement>) =>
    e.isPrimary && snapTo(snap)

  return {
    drawerRef,
    listeners: {
      handleDragEnd,
      handleRelease
    }
  }
}
