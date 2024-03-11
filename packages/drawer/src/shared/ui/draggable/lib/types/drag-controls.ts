import { DrawerValue } from '@/shared/lib/types'

export type NumberOr<T> = number | T

export class DragControls<T> {
  locked: DrawerValue<boolean>
  y = new DrawerValue<NumberOr<T>>(0)
  isDragging = new DrawerValue(false)

  constructor(initLocked: boolean) {
    this.locked = new DrawerValue(initLocked)
  }

  lock() {
    this.locked.set(true)
  }

  unlock() {
    this.locked.set(false)
  }
}
