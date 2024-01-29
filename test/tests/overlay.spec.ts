import { type Locator, expect, test } from '@playwright/test'

import { dragTo, getOpacity, getWindowSize, openDrawer } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/overlay')
})

test.describe('Overlay tests', () => {
  let overlay: Locator

  test.describe('uncontrolled', () => {
    test.beforeEach(async ({ page }) => {
      await openDrawer(page, 'uncontrolled')
      overlay = page.getByTestId('overlay')
    })

    test('should fade when opened', async ({ page }) => {
      const opacity = await getOpacity(overlay)

      expect(opacity).toBeLessThan(1)
      expect(opacity).toBeGreaterThan(0)
    })

    test('should increase the opacity when dragged up', async ({ page }) => {
      const startOpacity = await getOpacity(overlay)

      await dragTo(page, 0, 20, false)

      const endOpacity = await getOpacity(overlay)

      expect(endOpacity).toBeGreaterThan(startOpacity)
    })

    test('should decrease the opacity when dragged down', async ({ page }) => {
      const startOpacity = await getOpacity(overlay)

      await dragTo(page, getWindowSize(page).height, 2, false)

      const endOpacity = await getOpacity(overlay)

      expect(endOpacity).toBeLessThan(startOpacity)
    })
  })

  test.describe('fade-from', () => {
    test.beforeEach(async ({ page }) => {
      await openDrawer(page, 'fade-from')
      overlay = page.getByTestId('overlay')
    })

    test('should fade only from 300px', async ({ page }) => {
      const windowHeight = getWindowSize(page).height

      await dragTo(page, windowHeight - 300 + 50, 2, false)

      expect(await getOpacity(overlay)).toBeCloseTo(0)

      await dragTo(page, windowHeight - 300 - 50, 2, false)

      expect(await getOpacity(overlay)).toBeGreaterThan(0)
    })
  })

  test.describe('custom-primitive', () => {
    test('should be visible with `modal={false}`', async ({ page }) => {
      await openDrawer(page, 'custom-primitive')

      await expect(page.getByTestId('overlay')).toBeVisible()
    })
  })
})
