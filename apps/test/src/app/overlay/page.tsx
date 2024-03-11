'use client'

import * as Drawer from '@vladyoslav/drawer'

import {
  Content,
  CustomOverlay,
  Description,
  Header,
  Overlay,
  Trigger
} from '@/shared/ui'

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
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root>
        <Trigger data-testid="fade-from">Open fade from 300px</Trigger>
        <Drawer.Portal>
          <Overlay fadeFrom={300} />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root modal={false}>
        <Trigger data-testid="custom-primitive">Open custom primitive</Trigger>
        <Drawer.Portal>
          <CustomOverlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <div className="fixed bottom-0 left-0 right-0 h-[300px] bg-red-500/15 p-4 font-medium">
        300px
      </div>
    </>
  )
}

export default Page
