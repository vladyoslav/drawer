import { mergeHandlers, resetStyle, setStyle } from './helpers'

describe('mergeHandlers', () => {
  test('should merge handlers', () => {
    let counter = 0

    const merged = mergeHandlers(
      (v: number) => (counter += v),
      (v: number) => (counter += v * 2)
    )

    merged(1)

    expect(counter).toBe(3)
  })
})

describe('setStyle and resetStyle', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.createElement('div')
  })

  test('should set style', () => {
    setStyle(el, { color: 'red' })

    expect(el.style.color).toBe('red')
  })

  test('should reset style', () => {
    el.style.color = 'black'

    setStyle(el, { color: 'red' })

    expect(el.style.color).toBe('red')

    resetStyle(el, 'color')

    expect(el.style.color).toBe('black')
  })

  test('should reset all styles', () => {
    el.style.color = 'black'
    el.style.display = 'block'

    setStyle(el, { color: 'red', display: 'flex' })

    expect(el.style.color).toBe('red')
    expect(el.style.display).toBe('flex')

    resetStyle(el)

    expect(el.style.color).toBe('black')
    expect(el.style.display).toBe('block')
  })
})
