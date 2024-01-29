import { type ButtonHTMLAttributes, type FC, forwardRef } from 'react'

import { cn } from '@/shared/lib'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }) => {
  return (
    <button
      className={cn(
        'px-5 py-2',
        'rounded-full',
        'bg-slate-900 text-white',
        'hover:bg-slate-800',
        'active:scale-95 transition-all',
        'font-medium',
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'Button'
