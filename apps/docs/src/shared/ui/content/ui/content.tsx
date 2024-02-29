import { type FC, forwardRef } from 'react'

import { DrawerContent, type DrawerContentProps } from '@vladyoslav/drawer'

import { cn } from '@/shared/lib/helpers'

import styles from './content.module.css'

export const Content: FC<DrawerContentProps> = forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(({ className, ...props }, ref) => (
  <DrawerContent
    ref={ref}
    data-testid="content"
    className={cn(styles.root, className)}
    {...props}
  />
))

Content.displayName = 'Content'
