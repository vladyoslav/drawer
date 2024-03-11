'use client'

import * as Drawer from '@vladyoslav/drawer'

import { Content, Description, Header, Overlay, Trigger } from '@/shared/ui'

const Page = () => {
  return (
    <>
      <Drawer.Root scaleBackground>
        <Trigger>Open drawer</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root scaleBackground scaleFrom={200}>
        <Trigger data-testid="scale-from">Open scale from 200px</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root>
        <Trigger data-testid="without-scaling">Open without scaling</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <div className="fixed bottom-0 left-0 right-0 h-[200px] bg-red-500/15 p-4 font-medium">
        200px
      </div>
    </>
  )
}

export default Page
