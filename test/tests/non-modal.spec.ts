import { expect, test } from '@playwright/test'

import {
  checkIfClosed,
  checkIfNotClosed,
  dragTo,
  getWindowSize,
  openDrawer
} from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/non-modal')
})

test.describe('Non modal tests', () => {
  test.beforeEach(async ({ page }) => {
    await openDrawer(page, 'trigger')
  })

  test('should not close on background click', async ({ page }) => {
    await page.mouse.click(0, 0)

    await checkIfNotClosed(page)
  })

  test('should close on `Drawer.Close` click', async ({ page }) => {
    await page.getByTestId('close').click()

    await checkIfClosed(page)
  })

  test('should close on `Esc` pressed', async ({ page }) => {
    await page.keyboard.press('Escape')

    await checkIfClosed(page)
  })

  test('should close when dragged down', async ({ page }) => {
    await dragTo(page, getWindowSize(page).height)

    await checkIfClosed(page)
  })

  test('should allow interacting with background elements', async ({
    page
  }) => {
    const counter = page.getByTestId('counter')
    await counter.click()

    await checkIfNotClosed(page)

    await expect(counter).toHaveText('1')
  })
})
