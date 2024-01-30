'use client'

import { useState } from 'react'

import { Drawer } from '@vladyoslav/drawer'

import {
  Button,
  Content,
  Description,
  Header,
  Overlay,
  Trigger
} from '@/shared/ui'

const Page = () => {
  const [counter, setCounter] = useState(0)

  return (
    <Drawer.Root modal={false}>
      <Trigger>Open drawer</Trigger>
      <Button
        data-testid="counter"
        onClick={() => setCounter((counter) => counter + 1)}
      >
        {counter}
      </Button>
      <Drawer.Portal>
        <Overlay />
        <Content>
          <Header>Drawer header</Header>
          <Description>Drawer description</Description>
        </Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default Page
