'use client'

import { useState } from 'react'

import { Drawer } from '@vladyoslav/drawer'

import { Content, Description, Header, Overlay, Trigger } from '@/shared/ui'

const Page = () => {
  const snapPoints = [100, '50%', '100%']

  const [snapPoint, setSnapPoint] = useState(snapPoints[0])

  return (
    <>
      <Drawer.Root snapPoints={snapPoints}>
        <Trigger>Open drawer</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content className="px-0">
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
            <div className="overflow-y-auto w-full px-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="bg-gray-100 w-full h-24 my-4" />
              ))}
            </div>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root
        snapPoints={snapPoints}
        snap={snapPoint}
        setSnap={setSnapPoint}
      >
        <Trigger>Open controlled</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content className="px-0">
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
            <div className="overflow-y-auto w-full px-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="bg-gray-100 w-full h-24 my-4" />
              ))}
            </div>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default Page
