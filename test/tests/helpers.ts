import { type Page, expect } from '@playwright/test'

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

  await expect(page.getByTestId('content')).toBeVisible()
}

export const dragTo = async (page: Page, to: number) => {
  const content = page.getByTestId('content')
  const rect = (await content.boundingBox())!

  await page.hover('[vladyoslav-drawer]', {
    position: { y: 20, x: rect.width / 2 }
  })

  await page.mouse.down()

  await page.mouse.move(rect.x + rect.width / 2, to, { steps: 2 })

  await page.mouse.up()
}
