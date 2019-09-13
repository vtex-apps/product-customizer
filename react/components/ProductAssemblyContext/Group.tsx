import React, { createContext, useContext, Dispatch, useReducer, FC } from 'react'
import { path } from 'ramda'
import { GROUP_TYPES } from '../../modules/assemblyGroupType'


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

export const ProductAssemblyGroupContext = createContext<AssemblyOptionGroupType | undefined>(undefined)

export const ProductAssemblyGroupContextProvider: FC<ProductAssemblyGroupContextProviderProps> = ({ assemblyOption, children }) => {
  const path = getGroupPath(assemblyOption.treePath)
  const quantitySum = Object.values(assemblyOption.items || {}).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  )

  const initialState: AssemblyOptionGroupType = {
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

function reducer(state: AssemblyOptionGroupType, action: DispatchAction): AssemblyOptionGroupType {
  switch (action.type) {
    case 'SET_QUANTITY':
      if (!state.items) {
        return state
      }

      const { itemId, newQuantity, type, groupPath } = action.args
      let groupState = path(groupPath, state) as AssemblyOptionGroup

      if (type === GROUP_TYPES.SINGLE) {
        groupState.items = removeAllItems(groupState.items)
      }

      const newItems = {
        ...groupState.items,
        ...(itemId && groupState.items && groupState.items[itemId]
          ? { [itemId]: { ...groupState.items[itemId], quantity: newQuantity } }
          : {}
        )
      }

      const newQuantitySum = Object.values(newItems).reduce(
        (acc, { quantity }) => acc + quantity,
        0
      )

      groupState.quantitySum = newQuantitySum
      groupState.items = newItems

      return { ...state }
    default:
      return state
  }
}

function removeAllItems(items: Record<string, AssemblyItem>) {
  return Object.keys(items).reduce<Record<string, AssemblyItem>>((acc, itemId) => {
    acc[itemId] = {
      ...items[itemId],
      quantity: 0,
    }
    return acc
  }, {})
}