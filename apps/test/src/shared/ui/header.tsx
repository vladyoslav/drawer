import { type FC } from 'react'

import { DrawerTitle, type DrawerTitleProps } from '@vladyoslav/drawer'

import { Close } from '@/shared/ui'

export const Header: FC<DrawerTitleProps> = (props) => (
  <>
    <DrawerTitle {...props} className="text-lg font-semibold" />
    <Close className="absolute right-3 top-3" />
  </>
)
