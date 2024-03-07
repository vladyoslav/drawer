import { resetStyle, setStyle } from '@/shared/lib/helpers'

import { getDumpedValue, getUndumpedValue, shouldDrag } from './helpers'

describe('shouldDrag', () => {
  let root: HTMLElement
  let inner: HTMLElement

  beforeEach(() => {
    root = document.createElement('div')
    inner = document.createElement('div')
    root.append(inner)

    setStyle(root, { overflowY: 'auto' })

    const rootHeight = 100
    const innerHeight = 200

    jest.spyOn(root, 'scrollHeight', 'get').mockReturnValue(innerHeight)
    jest.spyOn(root, 'clientHeight', 'get').mockReturnValue(rootHeight)
  })

  test('should return false when user wants to scroll', () => {
    expect(shouldDrag(inner, root, false, true)).toBeFalsy()

    root.scrollTop = 50
    expect(shouldDrag(inner, root, false, true)).toBeFalsy()

    root.scrollTop = 100
    expect(shouldDrag(inner, root, true, true)).toBeFalsy()
  })

  test('should return true when user wants to drag', () => {
    expect(shouldDrag(inner, root, true, true)).toBeTruthy()

    root.scrollTop = 100
    expect(shouldDrag(inner, root, false, true)).toBeTruthy()
  })

  test('should work with overflowY scroll', () => {
    resetStyle(root)
    setStyle(root, { overflowY: 'scroll' })
    expect(shouldDrag(inner, root, true, true)).toBeTruthy()
    expect(shouldDrag(inner, root, false, true)).toBeFalsy()
  })

  test('should work with overflow scroll', () => {
    resetStyle(root)
    setStyle(root, { overflow: 'scroll' })
    expect(shouldDrag(inner, root, true, true)).toBeTruthy()
    expect(shouldDrag(inner, root, false, true)).toBeFalsy()
  })

  test('should work with overflow auto', () => {
    resetStyle(root)
    setStyle(root, { overflow: 'auto' })
    expect(shouldDrag(inner, root, true, true)).toBeTruthy()
    expect(shouldDrag(inner, root, false, true)).toBeFalsy()
  })

  test('should work with overflowY without scroll', () => {
    resetStyle(root)
    setStyle(root, { overflowY: 'visible' })
    expect(shouldDrag(inner, root, true, true)).toBeTruthy()
    expect(shouldDrag(inner, root, false, true)).toBeTruthy()
  })

  test('should work with overflow without scroll', () => {
    resetStyle(root)
    setStyle(root, { overlow: 'clip' })
    expect(shouldDrag(inner, root, true, true)).toBeTruthy()
    expect(shouldDrag(inner, root, false, true)).toBeTruthy()
  })
})

describe('getDumpedValue', () => {
  test('should return dumped value when it is out of the bounds', () => {
    const value = 110

    expect(getDumpedValue(value, 0, 100)).toBeLessThan(value)

    expect(getDumpedValue(-value, 0, 100)).toBeGreaterThan(-value)
  })

  test('should return same value when it is in the bounds', () => {
    const value = 50

    expect(getDumpedValue(value, 0, 100)).toBe(value)
  })

  test('should return the bound when elasticity is turned off', () => {
    const value = 110
    const max = 100

    expect(getDumpedValue(value, 0, max, 0)).toBe(max)
  })
})

describe('getUndumpedValue', () => {
  test('should return approximately initial value', () => {
    const value = 110

    const dumped = getDumpedValue(value, 0, 100)
    const undumped = getUndumpedValue(dumped, 0, 100)

    expect(Math.abs(undumped - value)).toBeLessThan(0.00001)
  })

  test('should return the bound when elasticity is turned off', () => {
    const value = 110
    const max = 100

    const dumped = getDumpedValue(value, 0, max, 0)
    const undumped = getUndumpedValue(dumped, 0, max, 0)

    expect(undumped).toBe(max)
  })
})
