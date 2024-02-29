import { type FC, forwardRef } from 'react'

import { DrawerContent, type DrawerContentProps } from '@vladyoslav/drawer'

import { cn } from '@/shared/lib'

export const Content: FC<DrawerContentProps> = forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(({ className, ...props }, ref) => (
  <DrawerContent
    ref={ref}
    data-testid="content"
    className={cn(
      'fixed bottom-0',
      'w-full max-w-sm rounded-t-2xl',
      'bg-white',
      'left-0 right-0 mx-auto',
      'max-h-[95vh] min-h-[65vh]',
      'flex flex-col items-center gap-2 p-4',
      'before:content-[""]',
      'before:h-1 before:w-10 before:rounded-full',
      'before:bg-gray-300',
      'before:absolute before:top-1.5',
      'shadow-2xl',
      className
    )}
    {...props}
  />
))

Content.displayName = 'Content'
