import React, { FC, createContext, useContext } from 'react'

type AssemblyItemContext = AssemblyItem | null

export const ProductAssemblyItemContext = createContext<AssemblyItemContext>(
  null
)

export const ProductAssemblyItemProvider: FC<Props> = ({ item, children }) => {
  return (
    <ProductAssemblyItemContext.Provider value={item}>
      {children}
    </ProductAssemblyItemContext.Provider>
  )
}

interface Props {
  item: AssemblyItem | null
}

export const useProductAssemblyItem = () =>
  useContext(ProductAssemblyItemContext)
