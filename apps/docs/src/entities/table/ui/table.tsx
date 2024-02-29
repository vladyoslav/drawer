import { type FC, type HTMLProps } from 'react'

import { cn } from '@/shared/lib/helpers'

import styles from './table.module.css'

interface TableProps extends HTMLProps<HTMLDivElement> {}

export const Table: FC<TableProps> = ({ className, ...props }) => {
  return <article className={cn(styles.root, className)} {...props} />
}
