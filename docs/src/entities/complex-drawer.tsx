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
        setSnap={setSnap}
        modal={false}
        dismissible={false}
        shouldScaleBackground={true}
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
                'px-4 flex flex-col w-full items-center gap-4 overflow-y-hidden',
                snap === lastPoint && 'overflow-y-auto'
              )}
            >
              <Button onClick={() => setOpen(false)}>Close Drawer</Button>
              <div className="w-full">
                {[...Array(5)].map((_, index) => (
                  <Fragment key={index}>
                    <div className="flex gap-4 mb-4">
                      <div className="w-1/3 h-24 bg-muted rounded-md" />
                      <div className="w-2/3 h-24 bg-muted rounded-md" />
                    </div>
                    <div className="mb-4 w-full h-24 bg-muted rounded-md" />
                    <div className="flex gap-4 mb-4">
                      <div className="w-3/4 h-24 bg-muted rounded-md" />
                      <div className="w-1/4 h-24 bg-muted rounded-full" />
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
