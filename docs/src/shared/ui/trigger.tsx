import { type FC } from 'react'

import { DrawerTrigger, type DrawerTriggerProps } from '@vladyoslav/drawer'

import { Button } from '@/shared/ui'

export const Trigger: FC<DrawerTriggerProps> = ({ children, ...props }) => (
  <DrawerTrigger asChild data-testid="trigger" {...props}>
    <Button>{children}</Button>
  </DrawerTrigger>
)
