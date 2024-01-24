import { type Snap } from '@/drawer/lib/types'

import { getSnap } from './helpers'

describe('getSnap', () => {
  let el: HTMLElement

  const snapPoints: Snap[] = [0, 10, '20px', '100%']

  beforeAll(() => {
    el = document.createElement('div')

    jest.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 100,
      toJSON: () => {}
    })
  })

  test('should return the correct snap point', () => {
    expect(getSnap(snapPoints, 4, el)).toBe(snapPoints.at(0))

    expect(getSnap(snapPoints, 6, el)).toBe(snapPoints.at(1))

    expect(getSnap(snapPoints, 11, el)).toBe(snapPoints.at(1))

    expect(getSnap(snapPoints, 16, el)).toBe(snapPoints.at(2))

    expect(getSnap(snapPoints, 60, el)).toBe(snapPoints.at(2))

    expect(getSnap(snapPoints, 61, el)).toBe(snapPoints.at(-1))
  })

  test('should work when the value is out of bounds', () => {
    expect(getSnap(snapPoints, -10, el)).toBe(snapPoints.at(0))

    expect(getSnap(snapPoints, 110, el)).toBe(snapPoints.at(-1))
  })
})
