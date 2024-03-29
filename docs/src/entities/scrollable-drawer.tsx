import { type FC, Fragment } from 'react'

import { Drawer } from '@vladyoslav/drawer'

import { Content, Header, Overlay, Root, Trigger } from '@/shared/ui'

export const ScrollableDrawer: FC = () => {
  return (
    <Root>
      <Trigger>Open Drawer</Trigger>
      <Drawer.Portal>
        <Overlay />
        <Content className="px-0">
          <Header>Drawer with scrollable content</Header>
          <div className="w-full overflow-y-auto px-8">
            {[...Array(5)].map((_, index) => (
              <Fragment key={index}>
                <div className="flex gap-4 mb-4">
                  <div className="w-1/3 h-24 bg-muted rounded-sm" />
                  <div className="w-2/3 h-24 bg-muted rounded-md" />
                </div>
                <div className="mb-4 w-full h-24 bg-muted rounded-xl" />
                <div className="flex gap-4 mb-4">
                  <div className="w-3/4 h-24 bg-muted rounded-md" />
                  <div className="w-1/4 h-24 bg-muted rounded-3xl" />
                </div>
              </Fragment>
            ))}
          </div>
        </Content>
      </Drawer.Portal>
    </Root>
  )
}
