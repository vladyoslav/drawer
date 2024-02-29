import React, { type FC, type PropsWithChildren, createContext } from 'react'

export const PortalContext = createContext<true | undefined>(undefined)

export interface PortalContextProviderProps extends PropsWithChildren {
  forceMount?: true
}

export const PortalContextProvider: FC<PortalContextProviderProps> = ({
  forceMount,
  ...props
}) => <PortalContext.Provider value={forceMount} {...props} />
