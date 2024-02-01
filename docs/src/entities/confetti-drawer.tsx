import { type FC, useEffect } from 'react'

import { confetti } from '@tsparticles/confetti'
import { Drawer } from '@vladyoslav/drawer'

import { Content, Header, Overlay, Root, Trigger } from '@/shared/ui'

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
        Open Drawer
      </Trigger>
      <Drawer.Portal>
        <Overlay />
        <Content>
          <Header className="text-4xl font-bold py-8">🎉Hi There!</Header>
        </Content>
      </Drawer.Portal>
    </Root>
  )
}
