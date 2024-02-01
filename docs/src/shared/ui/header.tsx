import { type FC } from 'react'

import { DrawerTitle, type DrawerTitleProps } from '@vladyoslav/drawer'

import { cn } from '@/shared/lib/helpers'
import { Close } from '@/shared/ui'

export const Header: FC<DrawerTitleProps> = ({ className, ...props }) => (
  <>
    <DrawerTitle
      {...props}
      className={cn('text-lg font-semibold', className)}
    />
    <Close className="absolute right-3 top-3" />
  </>
)
