import { useEffect } from 'react'

import { type Value } from '@/shared/lib/types'

export const usePreventScroll = (isDragging: Value<boolean>) => {
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
