import { expect, test } from '@playwright/test'

import { checkIfClosed, dragTo, getWindowSize, openDrawer } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/drawer-values')
})

test.describe('Drawer Values API tests', () => {
  test('should give real values', async ({ page }) => {
    await openDrawer(page, 'trigger')

    const y = page.getByTestId('y')
    const isDragging = page.getByTestId('is-dragging')

    await expect(y).toHaveText('-100%')
    await expect(isDragging).toHaveText('false')

    const pageHeight = getWindowSize(page).height

    await dragTo(page, pageHeight, 2, false)

    await expect(y).toHaveText('-50')
    await expect(isDragging).toHaveText('true')

    await page.mouse.up()

    await expect(y).toHaveText('0')
    await expect(isDragging).toHaveText('false')

    await checkIfClosed(page)
  })
})
