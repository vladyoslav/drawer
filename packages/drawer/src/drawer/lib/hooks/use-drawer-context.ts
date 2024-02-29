import { useContext } from 'react'

import { DrawerContext } from '../providers'

export const useDrawerContext = () => {
  const context = useContext(DrawerContext)

  if (context === null) {
    throw new Error('useDrawerContext was used outside of its Provider')
  }

  return context
}
