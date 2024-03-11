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

export const SnapPointsDrawer: FC = () => {
  const snapPoints = ['100px', '50%', '100%']
  const [snap, setSnap] = useState<number | string>(snapPoints[1])
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Root
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          setSnap(snapPoints[1])
        }}
        snapPoints={snapPoints}
        snap={snap}
        onSnapChange={setSnap}
      >
        <Drawer.Portal>
          <Overlay />
          <Content className="min-h-[95vh]">
            <Header>Drawer with snap points</Header>
            {snap !== snapPoints.at(-1) && (
              <Description>Try drag it higher!</Description>
            )}
            <div className="py-24 text-7xl font-black">{snap}</div>
          </Content>
        </Drawer.Portal>
      </Root>
    </>
  )
}
