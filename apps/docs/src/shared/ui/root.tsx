import { type FC } from 'react'

import { DrawerRoot, type DrawerRootProps } from '@vladyoslav/drawer'

export const Root: FC<DrawerRootProps> = ({ ...props }) => (
  <DrawerRoot scaleBackground {...props} />
)
