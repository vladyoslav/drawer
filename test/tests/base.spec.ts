import { expect, test } from '@playwright/test'

import { ANIMATION_DURATION } from './constants'
import { checkIfClosed, checkIfNotClosed, dragTo, openDrawer } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/base')
})

test.describe('Base tests', () => {
  test.describe('uncontrolled', () => {
    test('should open drawer', async ({ page }) => {
      await openDrawer(page)
    })

    test('should close on background click', async ({ page }) => {
      await openDrawer(page)

      await page.mouse.click(0, 0)

      await checkIfClosed(page)
    })

    test('should close on `Drawer.Close` click', async ({ page }) => {
      await openDrawer(page)

      await page.getByTestId('close').click()

      await checkIfClosed(page)
    })

    test('should close when dragged down', async ({ page }) => {
      await openDrawer(page)

      await dragTo(page, page.viewportSize()!.height)

      await checkIfClosed(page)
    })

    test('should not close when dragged up', async ({ page }) => {
      await openDrawer(page)

      await dragTo(page, 0)

      await checkIfNotClosed(page)
    })

    test('should close with animation', async ({ page }) => {
      await openDrawer(page)

      await page.mouse.click(0, 0)

      await expect(page.getByTestId('content')).toBeVisible()

      await checkIfClosed(page)
    })

    test('should open with animation', async ({ page }) => {
      await page.getByTestId('trigger').click()

      const content = page.getByTestId('content')

      const pageHeight = page.viewportSize()!.height

      const contentHeight = (await content.boundingBox())!.height

      expect((await content.boundingBox())!.y).toBeGreaterThan(
        pageHeight - contentHeight
      )

      await page.waitForTimeout(ANIMATION_DURATION)

      expect((await content.boundingBox())!.y).toBe(pageHeight - contentHeight)
    })

    test('should close with inertia', async ({ page }) => {
      await openDrawer(page)

      const content = page.getByTestId('content')

      const pageHeight = page.viewportSize()!.height

      const contentHeight = (await content.boundingBox())!.height

      await dragTo(page, pageHeight - contentHeight + 100)

      await checkIfClosed(page)
    })
  })
})
