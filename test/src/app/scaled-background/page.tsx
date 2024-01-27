'use client'

import { Drawer } from '@vladyoslav/drawer'

import { Content, Description, Header, Overlay, Trigger } from '@/shared/ui'

const Page = () => {
  return (
    <>
      <Drawer.Root shouldScaleBackground>
        <Trigger>Open drawer</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root shouldScaleBackground scaleFrom={200}>
        <Trigger>Open scale from 200px</Trigger>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <div className="fixed bottom-0 left-0 right-0 bg-red-500/15 h-[200px] font-medium p-4">
        200px
      </div>
    </>
  )
}

export default Page
