import { type FC } from 'react'

import * as Drawer from '@vladyoslav/drawer'

import { Content, Header, Overlay, Root, Trigger } from '@/shared/ui'

export const ScaledDrawer: FC = () => {
  return (
    <Root>
      <Trigger>Open Drawer</Trigger>
      <Drawer.Portal>
        <Overlay />
        <Content>
          <Header>Drawer with scaled background</Header>
        </Content>
      </Drawer.Portal>
    </Root>
  )
}
