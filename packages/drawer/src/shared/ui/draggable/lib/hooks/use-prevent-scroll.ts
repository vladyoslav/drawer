import { useEffect } from 'react'

import { type DrawerValue } from '@/shared/lib/classes'

export const usePreventScroll = (isDragging: DrawerValue<boolean>) => {
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging.get()) e.preventDefault()
  }

  useEffect(() => {
    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
}
