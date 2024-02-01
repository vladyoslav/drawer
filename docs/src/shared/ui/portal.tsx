import { type FC, type PropsWithChildren } from 'react'

import { createPortal } from 'react-dom'

interface PortalProps extends PropsWithChildren {
  container?: HTMLElement
}

export const Portal: FC<PortalProps> = ({
  container,
  children
}: PortalProps) => {
  if (typeof window !== 'object') return children

  const el = container || document.body

  return el ? createPortal(children, el) : children
}
