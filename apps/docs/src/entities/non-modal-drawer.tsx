import { type FC, useState } from 'react'

import { Drawer } from '@vladyoslav/drawer'

import {
  Button,
  Content,
  Description,
  Header,
  Overlay,
  Root
} from '@/shared/ui'

export const NonModalDrawer: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>
        {open ? 'Close' : 'Open'} Drawer
      </Button>
      <Root
        open={open}
        onOpenChange={setOpen}
        modal={false}
        shouldScaleBackground={false}
      >
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Non-modal drawer</Header>
            <Description>
              You can close it by clicking the close button or by dragging it
              down.
            </Description>
            <Button onClick={() => setOpen(false)}>Close Drawer</Button>
          </Content>
        </Drawer.Portal>
      </Root>
    </>
  )
}
