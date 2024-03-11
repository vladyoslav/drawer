import { type FC, useState } from 'react'

import * as Drawer from '@vladyoslav/drawer'

import {
  Button,
  Content,
  Description,
  Header,
  Overlay,
  Root
} from '@/shared/ui'

export const NonDismissibleDrawer: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Root open={open} onOpenChange={setOpen} dismissible={false}>
        <Drawer.Portal>
          <Overlay />
          <Content>
            <Header>Non-dismissible drawer</Header>
            <Description>
              You can close it only by clicking the button below or X button.
            </Description>
            <Button onClick={() => setOpen(false)}>Close Drawer</Button>
          </Content>
        </Drawer.Portal>
      </Root>
    </>
  )
}
