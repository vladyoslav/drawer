'use client'

// import { useState } from 'react'
import { useState } from 'react'

import { DrawerPortal, DrawerRoot } from '@vladyoslav/drawer'

import {
  Button,
  Content,
  Description,
  Header,
  Overlay,
  Trigger
} from '@/shared/ui'

const Page = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <DrawerRoot>
        <Trigger>Open drawer</Trigger>
        <DrawerPortal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </DrawerPortal>
      </DrawerRoot>
      <Button data-testid="controlled" onClick={() => setOpen(true)}>
        Open controlled
      </Button>
      <DrawerRoot open={open} onOpenChange={setOpen}>
        <DrawerPortal>
          <Overlay />
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
            <Button
              data-testid="close-controlled"
              onClick={() => setOpen(false)}
            >
              Close controlled
            </Button>
          </Content>
        </DrawerPortal>
      </DrawerRoot>
      <DrawerRoot>
        <Trigger data-testid="without-overlay">Open without overlay</Trigger>
        <DrawerPortal>
          <div /> {/*TODO*/}
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </DrawerPortal>
      </DrawerRoot>
    </>
  )
}

export default Page
