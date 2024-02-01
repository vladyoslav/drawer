import { type FC } from 'react'

import {
  DrawerDescription,
  type DrawerDescriptionProps
} from '@vladyoslav/drawer'

export const Description: FC<DrawerDescriptionProps> = (props) => (
  <DrawerDescription
    {...props}
    className="flex justify-center items-center text-center"
  />
)
