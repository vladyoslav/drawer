'use client'

import { Drawer } from '@vladyoslav/drawer'

import { Content, Description, Header, Overlay, Trigger } from '@/shared/ui'

const Page = () => {
  return (
    <>
      <Drawer.Root>
        <Trigger>Open drawer</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
          <Drawer.SnapAreas />
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root velocityMultiplier={0.01}>
        <Trigger data-testid="low-velocity-multiplier">
          Open with low velocity multiplier
        </Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
          <Drawer.SnapAreas />
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default Page
