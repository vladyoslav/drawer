import { type Locator, expect, test } from '@playwright/test'

import { ANIMATION_DURATION } from './constants'
import {
  checkIfClosed,
  checkIfNotClosed,
  dragTo,
  getWindowSize,
  openDrawer
} from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/base')
})

test.describe('Base tests', () => {
  test.describe('default', () => {
    const trigger = 'trigger'

    test('should open drawer', async ({ page }) => {
      await openDrawer(page, trigger)
    })

    test('should close on background click', async ({ page }) => {
      await openDrawer(page, trigger)

      await page.mouse.click(0, 0)

      await checkIfClosed(page)
    })

    test('should close on `Drawer.Close` click', async ({ page }) => {
      await openDrawer(page, trigger)

      await page.getByTestId('close').click()

      await checkIfClosed(page)
    })

    test('should close when dragged down', async ({ page }) => {
      await openDrawer(page, trigger)

      await dragTo(page, getWindowSize(page).height)

      await checkIfClosed(page)
    })

    test('should not close when dragged up', async ({ page }) => {
      await openDrawer(page, trigger)

      await dragTo(page, 0)

      await checkIfNotClosed(page)
    })

    test('should close with inertia', async ({ page }) => {
      await openDrawer(page, trigger)

      const content = page.getByTestId('content')

      const pageHeight = getWindowSize(page).height

      const contentHeight = (await content.boundingBox())!.height

      await dragTo(page, pageHeight - contentHeight + 200)

      await checkIfClosed(page)
    })
  })

  for (const rawTrigger of ['default', 'without-overlay']) {
    test.describe(rawTrigger.replaceAll('-', ' '), () => {
      const trigger = rawTrigger === 'default' ? 'trigger' : rawTrigger

      test('should close with animation', async ({ page }) => {
        await openDrawer(page, trigger)

        await page.mouse.click(0, 0)

        await expect(page.getByTestId('content')).toBeVisible()

        await checkIfClosed(page)
      })

      test('should open with animation', async ({ page }) => {
        await page.getByTestId(trigger).click()

        const content = page.getByTestId('content')

        const startY = (await content.boundingBox())!.y

        await page.waitForTimeout(ANIMATION_DURATION)

        const endY = (await content.boundingBox())!.y

        expect(startY).toBeGreaterThan(endY)
      })
    })
  }

  test.describe('controlled', () => {
    let content: Locator

    test.beforeEach(async ({ page }) => {
      await page.getByTestId('controlled').click()
      content = page.getByTestId('content')
    })

    test('should open when `open` prop is true', async ({ page }) => {
      await expect(content).toBeVisible()
    })

    test('should close when `open` prop is false', async ({ page }) => {
      await page.getByTestId('close-controlled').click()

      await expect(content).not.toBeVisible()
    })
  })
})
