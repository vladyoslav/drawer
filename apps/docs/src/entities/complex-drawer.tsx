import { type FC, Fragment, useState } from 'react'

import { Drawer } from '@vladyoslav/drawer'

import { cn } from '@/shared/lib/helpers'
import { Button, Content, Header, Overlay, Root } from '@/shared/ui'

export const ComplexDrawer: FC = () => {
  const snapPoints = ['100px', '50%', '100%']
  const [snap, setSnap] = useState<number | string>(snapPoints[0])
  const [open, setOpen] = useState(false)

  const lastPoint = snapPoints[snapPoints.length - 1]

  const onClose = () => {
    setSnap(snapPoints[0])
  }

  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>
        {open ? 'Close' : 'Open'} Drawer
      </Button>
      <Root
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        snap={snap}
        onSnapChange={setSnap}
        modal={false}
        dismissible={false}
        scaleBackground={true}
        scaleFrom={snapPoints[1]}
      >
        <Drawer.Portal>
          <Overlay
            radixPrimitive={false}
            blockInteraction={snap === lastPoint}
            fadeFrom={snapPoints[1]}
          />
          <Content
            className="px-0 pb-0"
            onInteractOutside={onClose}
            onEscapeKeyDown={onClose}
          >
            <Header>Complex drawer</Header>
            <div
              className={cn(
                'flex w-full flex-col items-center gap-4 overflow-y-hidden px-4',
                snap === lastPoint && 'overflow-y-auto'
              )}
            >
              <Button onClick={() => setOpen(false)}>Close Drawer</Button>
              <div className="w-full">
                {[...Array(5)].map((_, index) => (
                  <Fragment key={index}>
                    <div className="mb-4 flex gap-4">
                      <div className="h-24 w-1/3 rounded-md bg-muted" />
                      <div className="h-24 w-2/3 rounded-md bg-muted" />
                    </div>
                    <div className="mb-4 h-24 w-full rounded-md bg-muted" />
                    <div className="mb-4 flex gap-4">
                      <div className="h-24 w-3/4 rounded-md bg-muted" />
                      <div className="h-24 w-1/4 rounded-full bg-muted" />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </Content>
        </Drawer.Portal>
      </Root>
    </>
  )
}
