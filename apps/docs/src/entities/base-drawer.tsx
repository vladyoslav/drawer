import { type FC } from 'react'

import { Drawer } from '@vladyoslav/drawer'

import { Content, Header, Overlay, Root, Trigger } from '@/shared/ui'

export const BaseDrawer: FC = () => {
  return (
    <Root shouldScaleBackground={false}>
      <Trigger>Open Drawer</Trigger>
      <Drawer.Portal>
        <Overlay />
        <Content>
          <Header>Basic drawer</Header>
        </Content>
      </Drawer.Portal>
    </Root>
  )
}
