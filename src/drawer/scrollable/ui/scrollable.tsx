import React, {
  type PropsWithChildren,
  forwardRef,
  useEffect,
  useRef
} from 'react'

import { useComposedRefs } from '@radix-ui/react-compose-refs'

import { useDrawerContext } from '@/drawer/lib/hooks'
import { clamp } from '@/shared/lib/helpers'
import { useSetStyle } from '@/shared/lib/hooks'
import { type DragEventHandler, Draggable } from '@/shared/ui/draggable'
import {
  getDumpedValue,
  getUndumpedValue
} from '@/shared/ui/draggable/lib/helpers'

import { getMinConstraint } from '../lib/helpers'

export interface ScrollableProps extends PropsWithChildren {}

export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(
  ({ ...props }, forwardedRef) => {
    const {
      drawerControls,
      scrollableControls,
      scrollableRef,
      snap,
      snapPoints,
      onScrollableConstraint
    } = useDrawerContext()
    const { y } = scrollableControls

    const animationId = useRef<number | null>(null)

    const composedRef = useComposedRefs(scrollableRef, forwardedRef)

    const [setStyle, resetStyle] = useSetStyle(scrollableRef)

    const max = 0

    useEffect(() => {
      if (snap === snapPoints[snapPoints.length - 1]) return

      y.set(max)

      drawerControls.unlock()
      scrollableControls.lock()
    }, [snap])

    useEffect(() => {
      y.set(max)
    }, [])

    const resetTransition = () => resetStyle('transitionDuration')

    const resetToBounds = () => {
      const node = scrollableRef.current
      if (!node) return
      y.set(clamp(getMinConstraint(node), max, y.get()))
    }

    const animate = (prev: number, cur: number, velocity: number) => {
      const node = scrollableRef.current
      if (!node) return

      const time = cur - prev

      const min = getMinConstraint(node)
      const delta = velocity * time
      const newUndumpedY = getUndumpedValue(y.get(), min, max) + delta

      y.set(getDumpedValue(newUndumpedY, min, max))

      const acceleration = -0.0015

      const newVelocity =
        Math.sign(velocity) *
        Math.max(Math.abs(velocity) + acceleration * time, 0)

      const maxDist = Math.abs(velocity) * 100
      const outOfMax =
        newUndumpedY - min <= -maxDist || newUndumpedY - max >= maxDist

      if (newVelocity === 0 || outOfMax) {
        resetTransition()
        return resetToBounds()
      }

      animationId.current = window.requestAnimationFrame((time) =>
        animate(cur, time, newVelocity)
      )
    }

    const handleDragEnd: DragEventHandler = (_, { velocity }) => {
      if (scrollableControls.locked.get()) return resetToBounds()

      setStyle({ transitionDuration: '0s' })
      animationId.current = window.requestAnimationFrame((time) =>
        animate(time, time, velocity)
      )
    }

    const handlePointerDown = () => {
      if (animationId.current === null) return

      window.cancelAnimationFrame(animationId.current)
      animationId.current = null
      resetTransition()
    }

    return (
      <Draggable
        vladyoslav-drawer-scrollable=""
        ref={composedRef}
        dragControls={scrollableControls}
        constraints={{
          min: getMinConstraint,
          max
        }}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
        onConstraint={onScrollableConstraint}
        {...props}
      />
    )
  }
)

Scrollable.displayName = 'Drawer.Scrollable'
