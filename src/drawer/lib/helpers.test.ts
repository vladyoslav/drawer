import { cssToPx, getSnapAreas } from './helpers'
import { type Snap } from './types'

describe('drawer helpers', () => {
  let el: HTMLElement

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

  describe('cssToPx', () => {
    test('should throw an error when there is no element', () => {
      expect(() => cssToPx('anything', null as unknown as HTMLElement)).toThrow(
        'You have to provide element'
      )
    })

    test('should work with the number', () => {
      expect(cssToPx(228, el)).toBe(228)
    })

    test('should work with the percent', () => {
      expect(cssToPx('42%', el)).toBe(42)
    })

    test('should work with the px', () => {
      expect(cssToPx('52px', el)).toBe(52)
    })

    test('should throw an error in other cases', () => {
      expect(() => cssToPx('anything', el)).toThrow('Unknown value units')
    })
  })

  describe('getSnapAreas', () => {
    test('should return the correct snap areas', () => {
      const snapPoints: Snap[] = [0, 10, '20px', '100%']

      const snapAreas = getSnapAreas(snapPoints, el)

      expect(snapAreas).toEqual([5, 15, 60])
    })
  })
})
