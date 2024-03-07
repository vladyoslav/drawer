import { test } from '@playwright/test'

import {
  checkIfClosed,
  checkIfNotClosed,
  dragTo,
  getWindowSize,
  openDrawer
} from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/velocity')
})

test.describe('Velocity multiplier tests', () => {
  test.describe('with default velocity multiplier', () => {
    test('should close', async ({ page }) => {
      await openDrawer(page, 'trigger')

      const content = page.getByTestId('content')

      const pageHeight = getWindowSize(page).height

      const contentHeight = (await content.boundingBox())!.height

      await dragTo(page, pageHeight - contentHeight + 150)

      await checkIfClosed(page)
    })
  })

  test.describe('with low velocity multiplier', () => {
    test('should not close', async ({ page }) => {
      await openDrawer(page, 'low-velocity-multiplier')

      const content = page.getByTestId('content')

      const pageHeight = getWindowSize(page).height

      const contentHeight = (await content.boundingBox())!.height

      await dragTo(page, pageHeight - contentHeight + 150)

      await checkIfNotClosed(page)
    })
  })
})
