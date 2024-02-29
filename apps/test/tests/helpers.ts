import { type Locator, type Page, expect } from '@playwright/test'

import { ANIMATION_DURATION } from './constants'

export const checkIfClosed = async (page: Page) => {
  await page.waitForTimeout(ANIMATION_DURATION)

  await expect(page.getByTestId('content')).not.toBeVisible()
}

export const checkIfNotClosed = async (page: Page) => {
  await page.waitForTimeout(ANIMATION_DURATION)

  await expect(page.getByTestId('content')).toBeVisible()
}

export const openDrawer = async (page: Page, trigger: string) => {
  await expect(page.getByTestId('content')).not.toBeVisible()

  await page.getByTestId(trigger).click()

  await page.waitForTimeout(ANIMATION_DURATION)

  await expect(page.getByTestId('content')).toBeVisible()
}

export const dragTo = async (
  page: Page,
  to: number,
  steps = 2,
  release = true
) => {
  const content = page.getByTestId('content')
  const rect = (await content.boundingBox())!

  await content.hover({ position: { y: 50, x: rect.width / 2 } })

  await page.mouse.down()

  // https://playwright.dev/docs/input#dragging-manually note
  await page.mouse.move(rect.x + rect.width / 2, rect.y + 50)
  await page.mouse.move(rect.x + rect.width / 2, to, { steps })

  release && (await page.mouse.up())
}

export const getWidth = async (locator: Locator) =>
  (await locator.boundingBox())!.width

export const getOffsetWidth = async (locator: Locator) =>
  await locator.evaluate((el) => (el as HTMLElement).offsetWidth)

export const getWindowSize = (page: Page) => page.viewportSize()!

export const getOpacity = async (locator: Locator) =>
  parseFloat(
    await locator.evaluate((el) => window.getComputedStyle(el).opacity)
  )
