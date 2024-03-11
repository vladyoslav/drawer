'use client'

import * as Drawer from '@vladyoslav/drawer'

import { Content, Description, Header, Overlay, Trigger } from '@/shared/ui'

const Page = () => {
  return (
    <Drawer.Root dismissible={false}>
      <Trigger>Open drawer</Trigger>
      <Drawer.Portal>
        <Overlay />
        <Content>
          <Header>Drawer header</Header>
          <Description>Drawer description</Description>
        </Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default Page
