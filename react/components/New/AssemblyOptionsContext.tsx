import React, { FC, useContext } from 'react'

const AssemblyOptionsContext = React.createContext<
  Record<string, ItemAssembly>
>({})

interface AssemblyOptionsProviderProps {
  options: Record<string, ItemAssembly>
}

export const AssemblyOptionsProvider: FC<AssemblyOptionsProviderProps> = ({
  options,
  children,
}) => {
  return (
    <AssemblyOptionsContext.Provider value={options}>
      {children}
    </AssemblyOptionsContext.Provider>
  )
}

export const useAssemblyOptions = (productId: string): ItemAssembly => {
  const state = useContext(AssemblyOptionsContext)
  return state[productId] as ItemAssembly
}
