'use client'

import { Drawer } from '@vladyoslav/drawer'

import { Content, Description, Header, Overlay, Trigger } from '@/shared/ui'

const Page = () => {
  return (
    <>
      <Drawer.Root>
        <Trigger>Open fade from 300px</Trigger>
        <Drawer.Portal>
          <Overlay fadeFrom={300} />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
      <div className="fixed bottom-0 left-0 right-0 bg-red-500/15 h-[300px] font-medium p-4">
        300px
      </div>
    </>
  )
}

export default Page
