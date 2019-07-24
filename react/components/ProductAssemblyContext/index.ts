import { createContext, useContext, Dispatch } from 'react'

export type DispatchAction = {
  type: 'SET_QUANTITY'
  args: {
    itemId: string
    newQuantity: number
    type: string
    groupPath: string[]
  }
}

interface ItemState {
  groupMaxQuantity: number
  groupMinQuantity: number
  item: AssemblyItem
  groupType: string
  groupQuantitySum: number
  groupPath: string[]
}

export const ProductAssemblyDispatchContext = createContext<
  Dispatch<DispatchAction>
>(() => {})
export const useProductAssemblyDispatch = () =>
  useContext(ProductAssemblyDispatchContext)

export const ProductAssemblyItemContext = createContext<ItemState>({
  groupMaxQuantity: 0,
  groupMinQuantity: 0,
  item: {
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
  },
  groupType: '',
  groupQuantitySum: 0,
  groupPath: [],
})

export const useProductAssemblyItem = () =>
  useContext(ProductAssemblyItemContext)
