'use client'

// import { useState } from 'react'
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
  const [open, setOpen] = useState(false)
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
      <Button data-testid="controlled" onClick={() => setOpen(true)}>
        Open controlled
      </Button>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
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
        </Drawer.Portal>
      </Drawer.Root>
      <Drawer.Root>
        <Trigger data-testid="without-overlay">Open without overlay</Trigger>
        <Drawer.Portal>
          <div /> {/*TODO*/}
          <Content>
            <Header>Drawer header</Header>
            <Description>Drawer description</Description>
          </Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default Page
