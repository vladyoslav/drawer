import { type FC, useEffect } from 'react'

import { confetti } from '@tsparticles/confetti'
import { Drawer } from '@vladyoslav/drawer'

import {
  Content,
  Description,
  Header,
  Overlay,
  Root,
  Trigger
} from '@/shared/ui'

export const ConfettiDrawer: FC = () => {
  useEffect(() => {
    const init = async () => await confetti({ count: 0 })

    init()
  }, [])

  return (
    <Root>
      <Trigger
        onClick={async () => {
          await confetti({
            count: 100,
            spread: 70,
            angle: 110,
            startVelocity: 60,
            position: { y: 100, x: 40 }
          })
          await confetti({
            count: 100,
            spread: 70,
            angle: 70,
            startVelocity: 60,
            position: { y: 100, x: 60 }
          })
        }}
      >
        🎉Try It Out!
      </Trigger>
      <Drawer.Portal>
        <Overlay />
        <Content>
          <Header className="py-8 text-4xl font-bold">🎉Hi There!</Header>
          <Description>
            Try to close it by clicking on the background or dragging it down!
          </Description>
        </Content>
      </Drawer.Portal>
    </Root>
  )
}
