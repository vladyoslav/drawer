import { type FC } from 'react'

import { DrawerClose, type DrawerCloseProps } from '@vladyoslav/drawer'

import { cn } from '@/shared/lib'

export const Close: FC<DrawerCloseProps> = ({ className, ...props }) => (
  <DrawerClose
    data-testid="close"
    {...props}
    className={cn(
      'bg-gray-100 text-gray-500 rounded-full p-1.5',
      'hover:bg-gray-200',
      'transition-colors duration-500',
      className
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-x"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </DrawerClose>
)
