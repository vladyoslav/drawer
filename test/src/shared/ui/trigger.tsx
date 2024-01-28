import { type FC } from 'react'

import { DrawerTrigger, type DrawerTriggerProps } from '@vladyoslav/drawer'

import { cn } from '@/shared/lib'

export const Trigger: FC<DrawerTriggerProps> = (props) => (
  <DrawerTrigger
    data-testid="uncontrolled"
    className={cn(
      'px-5 py-2',
      'rounded-full',
      'bg-slate-900 text-white',
      'hover:bg-slate-800',
      'active:scale-95 transition-all',
      'font-medium'
    )}
    {...props}
  />
)
