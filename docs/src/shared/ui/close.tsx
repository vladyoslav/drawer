import { type FC } from 'react'

import { DrawerClose, type DrawerCloseProps } from '@vladyoslav/drawer'
import { X } from 'lucide-react'

import { cn } from '@/shared/lib/helpers'

export const Close: FC<DrawerCloseProps> = ({ className, ...props }) => (
  <DrawerClose
    data-testid="close"
    {...props}
    className={cn(
      'bg-muted hover:bg-muted/80 text-muted-foreground rounded-full p-1',
      'transition-colors',
      className
    )}
  >
    <X size={20} />
  </DrawerClose>
)
