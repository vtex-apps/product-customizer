import React, { createContext, useContext, Dispatch, useReducer, FC } from 'react'
import { path } from 'ramda'
import { GROUP_TYPES } from '../../modules/assemblyGroupType'

export interface GroupComputedParams {
  path: string[]
  quantitySum: number
}

export type GroupState = AssemblyOptionGroupType & GroupComputedParams

type DispatchAction = {
  type: 'SET_QUANTITY'
  args: {
    itemId: string
    newQuantity: number
    type: string
    groupPath: string[]
  }
}

export const ProductAssemblyDispatchContext = createContext<Dispatch<DispatchAction>>(() => { })

export const ProductAssemblyGroupContext = createContext<GroupState | undefined>(undefined)

export const ProductAssemblyGroupContextProvider: FC<ProductAssemblyGroupContextProviderProps> = ({ assemblyOption, children }) => {
  const path = getGroupPath(assemblyOption.treePath)
  const quantitySum = Object.values(assemblyOption.items || {}).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  )

  const initialState: GroupState = {
    ...assemblyOption,
    path,
    quantitySum: quantitySum,
  }

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  return (
    <ProductAssemblyDispatchContext.Provider value={dispatch}>
      <ProductAssemblyGroupContext.Provider value={state}>
        {children}
      </ProductAssemblyGroupContext.Provider>
    </ProductAssemblyDispatchContext.Provider>
  )
}

function getGroupPath(assemblyTreePath?: TreePath[]) {
  const treePath = assemblyTreePath || []

  let groupPath: string[] = []
  for (const currentPath of treePath) {
    groupPath = groupPath.concat([
      'items',
      currentPath.itemId,
      'children',
      currentPath.groupId,
    ])
  }

  return groupPath
}

interface ProductAssemblyGroupContextProviderProps {
  assemblyOption: AssemblyOptionGroupType
}

export const useProductAssemblyGroupDispatch = () =>
  useContext(ProductAssemblyDispatchContext)

export const useProductAssemblyGroupState = () =>
  useContext(ProductAssemblyGroupContext)

function reducer(state: GroupState, action: DispatchAction): GroupState {
  switch (action.type) {
    case 'SET_QUANTITY':
      if (!state.items) {
        return state
      }

      const { itemId, newQuantity, type, groupPath } = action.args
      const groupState = path(groupPath, state) as AssemblyOptionGroup

      if (type === GROUP_TYPES.SINGLE) {
        return {
          ...state,
          quantitySum: 0,
          items: removeAllItems(groupState.items)
        }
      }

      const newItems = {
        ...state.items,
        ...(itemId && state.items && state.items[itemId]
          ? { [itemId]: { ...state.items[itemId], quantity: newQuantity } }
          : {}
        )
      }

      const newQuantitySum = Object.values(newItems).reduce(
        (acc, { quantity }) => acc + quantity,
        0
      )

      return {
        ...state,
        quantitySum: newQuantitySum,
        items: newItems,
      }
    default:
      return state
  }
}

const removeAllItems = (items: Record<string, AssemblyItem>) => {
  return Object.keys(items).reduce<Record<string, AssemblyItem>>((acc, itemId) => {
    acc[itemId] = {
      ...items[itemId],
      quantity: 0,
    }
    return acc
  }, {})
}