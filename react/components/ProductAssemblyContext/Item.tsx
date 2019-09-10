import React, { FC, createContext, useContext } from 'react'

export const ProductAssemblyItemContext = createContext<AssemblyItem>({
  image: '',
  name: '',
  id: '',
  price: 0,
  minQuantity: 0,
  maxQuantity: 0,
  seller: '',
  initialQuantity: 0,
  quantity: 0,
  children: null,
})

export const ProductAssemblyItemProvider: FC<Props> = ({ item, children }) => {
  return (
    <ProductAssemblyItemContext.Provider value={item}>
      {children}
    </ProductAssemblyItemContext.Provider>
  )
}

interface Props {
  item: AssemblyItem
}

export const useProductAssemblyItem = () =>
  useContext(ProductAssemblyItemContext)
