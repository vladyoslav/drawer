import { useContext } from 'react'

import { PortalContext } from '../providers'

export const usePortalContext = () => {
  const context = useContext(PortalContext)

  if (context === null) {
    throw new Error('usePortalContext was used outside of its Provider')
  }

  return context
}
