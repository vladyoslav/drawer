import { type Locator, expect, test } from '@playwright/test'

import {
  checkIfClosed,
  dragTo,
  getOffsetWidth,
  getWidth,
  getWindowSize,
  openDrawer
} from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/scaled-background')
})

test.describe('Scaled background tests', () => {
  let wrapper: Locator

  test.beforeEach(async ({ page }) => {
    wrapper = page.getByTestId('wrapper')
  })

  const trigger = 'trigger'
  test.describe('default', () => {
    test('should scale background when opened', async ({ page }) => {
      await openDrawer(page, trigger)

      const width = await getWidth(wrapper)
      const offsetWidth = await getOffsetWidth(wrapper)

      expect(width).toBeLessThan(offsetWidth)
    })

    test('should not scale background when closed', async ({ page }) => {
      expect(await getWidth(wrapper)).toBeCloseTo(await getOffsetWidth(wrapper))

      await openDrawer(page, trigger)

      expect(await getWidth(wrapper)).not.toBeCloseTo(
        await getOffsetWidth(wrapper)
      )

      await page.getByTestId('close').click()

      await checkIfClosed(page)

      expect(await getWidth(wrapper)).toBeCloseTo(await getOffsetWidth(wrapper))
    })

    test('should decrease the scale when dragged up', async ({ page }) => {
      await openDrawer(page, trigger)

      const startWidth = await getWidth(wrapper)

      await dragTo(page, 0, 20, false)

      const endWidth = await getWidth(wrapper)

      expect(endWidth).toBeLessThan(startWidth)
    })

    test('should increase the scale when dragged down', async ({ page }) => {
      await openDrawer(page, trigger)

      const startWidth = await getWidth(wrapper)

      await dragTo(page, getWindowSize(page).height, 2, false)

      const endWidth = await getWidth(wrapper)

      expect(endWidth).toBeGreaterThan(startWidth)
    })
  })

  test.describe('scale from', () => {
    test('should scale only from 200px', async ({ page }) => {
      await openDrawer(page, 'scale-from')

      const offsetWidth = await getOffsetWidth(wrapper)
      const windowHeight = getWindowSize(page).height

      await dragTo(page, windowHeight - 200 + 50, 2, false)

      expect(await getWidth(wrapper)).toBeCloseTo(offsetWidth)

      await dragTo(page, windowHeight - 200 - 50, 2, false)

      expect(await getWidth(wrapper)).toBeLessThan(offsetWidth)
    })
  })

  test.describe('without scaling', () => {
    test('should not scale background regardless of the state', async ({
      page
    }) => {
      expect(await getWidth(wrapper)).toBeCloseTo(await getOffsetWidth(wrapper))

      await openDrawer(page, 'without-scaling')

      expect(await getWidth(wrapper)).toBeCloseTo(await getOffsetWidth(wrapper))

      await page.getByTestId('close').click()

      await checkIfClosed(page)

      expect(await getWidth(wrapper)).toBeCloseTo(await getOffsetWidth(wrapper))
    })
  })
})
