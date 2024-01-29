import { type Locator, expect, test } from '@playwright/test'

import { ANIMATION_DURATION } from './constants'
import { dragTo, getWindowSize, openDrawer } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/snap-points')
})

test.describe('Snap points tests', () => {
  let content: Locator
  let firstPoint: number
  let secondPoint: number
  let thirdPoint: number
  const inaccuracy = 6

  test.beforeEach(async ({ page }) => {
    const windowHeight = getWindowSize(page).height
    firstPoint = windowHeight - 200
    secondPoint = windowHeight / 2
    thirdPoint = 0
  })

  test.describe('default', () => {
    test.beforeEach(async ({ page }) => {
      await openDrawer(page, 'trigger')
      content = page.getByTestId('content')
    })

    test('should snap to the nearest point', async ({ page }) => {
      for (const y of [secondPoint, thirdPoint, firstPoint]) {
        await dragTo(page, y, 100)
        await page.waitForTimeout(ANIMATION_DURATION)

        expect(Math.abs((await content.boundingBox())!.y - y)).toBeLessThan(
          inaccuracy
        )
      }
    })

    test('should snap with inertia', async ({ page }) => {
      await dragTo(page, firstPoint - 200, 5)
      await page.waitForTimeout(ANIMATION_DURATION)

      expect(
        Math.abs((await content.boundingBox())!.y - thirdPoint)
      ).toBeLessThan(inaccuracy)
    })
  })

  test.describe('controlled', () => {
    test.beforeEach(async ({ page }) => {
      await openDrawer(page, 'controlled')
      content = page.getByTestId('content')
    })

    test('should snap on `snap` prop change', async ({ page }) => {
      for (const y of [secondPoint, thirdPoint, firstPoint]) {
        await page.getByTestId('change').click()
        await page.waitForTimeout(ANIMATION_DURATION)

        expect(Math.abs((await content.boundingBox())!.y - y)).toBeLessThan(
          inaccuracy
        )
      }
    })
  })
})
