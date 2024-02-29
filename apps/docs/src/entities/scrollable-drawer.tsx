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
                <div className="mb-4 flex gap-4">
                  <div className="h-24 w-1/3 rounded-sm bg-muted" />
                  <div className="h-24 w-2/3 rounded-md bg-muted" />
                </div>
                <div className="mb-4 h-24 w-full rounded-xl bg-muted" />
                <div className="mb-4 flex gap-4">
                  <div className="h-24 w-3/4 rounded-md bg-muted" />
                  <div className="h-24 w-1/4 rounded-3xl bg-muted" />
                </div>
              </Fragment>
            ))}
          </div>
        </Content>
      </Drawer.Portal>
    </Root>
  )
}
