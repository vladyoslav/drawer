'use client'

import { useState } from 'react'

import * as Drawer from '@vladyoslav/drawer'
import {
  type Snap,
  useDrawerValueChange,
  useDrawerValues
} from '@vladyoslav/drawer'

import { Content, Description, Header, Overlay, Trigger } from '@/shared/ui'

const Info = () => {
  const values = useDrawerValues()

  const [y, setY] = useState<Snap>(0)
  const [isDragging, setIsDragging] = useState(false)

  useDrawerValueChange(values.y, (latest) => {
    if (typeof latest === 'number') setY(Math.round(latest))
    else setY(latest)
  })

  useDrawerValueChange(values.isDragging, setIsDragging)

  return (
    <>
      <span data-testid="y">{y}</span>
      <span data-testid="is-dragging">{isDragging.toString()}</span>
    </>
  )
}

const Page = () => {
  return (
    <>
      <Drawer.Root>
        <Trigger>Open drawer</Trigger>
        <Info />
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
          <Drawer.NOT_FOR_PRODUCTION_USE_SnapAreas />
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default Page
