'use client'

import { useState } from 'react'

import { Drawer } from '@vladyoslav/drawer'

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

  const [snapPoint, setSnapPoint] = useState(snapPoints[0])

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
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root
        snapPoints={snapPoints}
        snap={snapPoint}
        setSnap={setSnapPoint}
      >
        <Trigger data-testid="controlled">Open controlled</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content className="max-h-screen min-h-screen">
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
            <Button
              data-testid="change"
              onClick={() =>
                setSnapPoint((snapPoint) => {
                  return snapPoints[
                    (snapPoints.indexOf(snapPoint) + 1) % snapPoints.length
                  ]
                })
              }
            >
              {snapPoint}
            </Button>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default Page
