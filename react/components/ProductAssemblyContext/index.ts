import { createContext, useContext, Dispatch, useReducer } from 'react'
import { path, mapObjIndexed } from 'ramda'
import { GROUP_TYPES } from '../../utils'

export type GroupState = AssemblyOptionGroup

type DispatchAction = {
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
  groupType: GroupTypes
  groupQuantitySum: number
  groupPath: string[]
}

const removeAllItems = mapObjIndexed<AssemblyItem, AssemblyItem>(item => ({
  ...item,
  quantity: 0,
}))

function reducer(state: GroupState, action: DispatchAction) {
  const args = action.args || {}
  switch (action.type) {
    case 'SET_QUANTITY':
      const { itemId, newQuantity, type, groupPath } = args
      const groupState = path(groupPath, state) as AssemblyOptionGroup
      let newItems = groupState.items
      if (type === GROUP_TYPES.SINGLE) {
        newItems = removeAllItems(newItems)
      }
      groupState.items = {
        ...newItems,
        [itemId]: {
          ...newItems[itemId],
          quantity: newQuantity,
        },
      }
      return { ...state }
    default:
      return state
  }
}

export const useGroupContextReducer = (assemblyOption: AssemblyOptionGroup) =>
  useReducer(reducer, assemblyOption)

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
  groupType: 'MULTIPLE',
  groupQuantitySum: 0,
  groupPath: [],
})

export const useProductAssemblyItem = () =>
  useContext(ProductAssemblyItemContext)
