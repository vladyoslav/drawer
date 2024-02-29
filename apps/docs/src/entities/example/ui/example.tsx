import { type FC, type HTMLProps } from 'react'

import { cn } from '@/shared/lib/helpers'

import styles from './example.module.css'

interface ExampleProps extends HTMLProps<HTMLDivElement> {}

export const Example: FC<ExampleProps> = ({ className, ...props }) => {
  return <article className={cn(styles.root, className)} {...props} />
}
