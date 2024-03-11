'use client'

import { useState } from 'react'

import * as Drawer from '@vladyoslav/drawer'

import {
  Button,
  Content,
  Description,
  Header,
  Overlay,
  Trigger
} from '@/shared/ui'

const Page = () => {
  const snapPoints = [200, '50%', '100%']

  const [snap, setSnap] = useState(snapPoints[0])

  return (
    <>
      <Drawer.Root snapPoints={snapPoints}>
        <Trigger>Open drawer</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content className="max-h-screen min-h-screen">
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
          <Drawer.SnapAreas />
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root snapPoints={snapPoints} snap={snap} onSnapChange={setSnap}>
        <Trigger data-testid="controlled">Open controlled</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content className="max-h-screen min-h-screen">
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
            <Button
              data-testid="change"
              onClick={() =>
                setSnap((snapPoint) => {
                  return snapPoints[
                    (snapPoints.indexOf(snapPoint) + 1) % snapPoints.length
                  ]
                })
              }
            >
              {snap}
            </Button>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default Page
