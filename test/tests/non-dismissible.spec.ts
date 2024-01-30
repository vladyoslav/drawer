import { test } from '@playwright/test'

import { checkIfNotClosed, dragTo, getWindowSize, openDrawer } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/non-dismissible')
})

test.describe('Non dismissible tests', () => {
  test.beforeEach(async ({ page }) => {
    await openDrawer(page, 'trigger')
  })

  test('should not close on background click', async ({ page }) => {
    await page.mouse.click(0, 0)

    await checkIfNotClosed(page)
  })

  test('should not close on `Drawer.Close` click', async ({ page }) => {
    await page.getByTestId('close').click()

    await checkIfNotClosed(page)
  })

  test('should not close on `Esc` pressed', async ({ page }) => {
    await page.keyboard.press('Escape')

    await checkIfNotClosed(page)
  })

  test('should not close when dragged down', async ({ page }) => {
    await dragTo(page, getWindowSize(page).height)

    await checkIfNotClosed(page)
  })
})
