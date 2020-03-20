import React, {
  createContext,
  useContext,
  Dispatch,
  useReducer,
  FC,
} from 'react'
import { path } from 'ramda'

import { GROUP_TYPES } from '../../modules/assemblyGroupType'

type DispatchAction = SetQuantityAction | SetInputValueAction | OptinAction

type SetQuantityAction = {
  type: 'SET_QUANTITY'
  args: {
    itemId: string
    newQuantity: number
    type: string
    groupPath: string[]
  }
}

type SetInputValueAction = {
  type: 'SET_INPUT_VALUE'
  args: {
    inputValueLabel: string
    inputValue: string | boolean
    groupPath: string[]
  }
}

type OptinAction = {
  type: 'OPTIN'
  args: {
    groupPath: string[]
  }
}

export const ProductAssemblyDispatchContext = createContext<
  Dispatch<DispatchAction>
>(() => {})

export const ProductAssemblyGroupContext = createContext<
  AssemblyOptionGroupState | undefined
>(undefined)

export const ProductAssemblyGroupContextProvider: FC<ProductAssemblyGroupContextProviderProps> = ({
  assemblyOption,
  children,
}) => {
  const groupPath = getGroupPath(assemblyOption.treePath)
  const quantitySum = Object.values(assemblyOption.items ?? {}).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  )

  const valuesOfInputValues = assemblyOption.inputValues.reduce<
    Record<string, string | boolean>
  >((acc, inputValue) => {
    acc[inputValue.label] = inputValue.defaultValue
    return acc
  }, {})

  const initialState: AssemblyOptionGroupState = {
    ...assemblyOption,
    path: groupPath,
    quantitySum,
    optin: assemblyOption.required,
    valuesOfInputValues,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ProductAssemblyDispatchContext.Provider value={dispatch}>
      <ProductAssemblyGroupContext.Provider value={state}>
        {children}
      </ProductAssemblyGroupContext.Provider>
    </ProductAssemblyDispatchContext.Provider>
  )
}

function getGroupPath(assemblyTreePath?: TreePath[]) {
  const treePath = assemblyTreePath ?? []

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
  assemblyOption: AssemblyOptionGroupState
}

export const useProductAssemblyGroupDispatch = () =>
  useContext(ProductAssemblyDispatchContext)

export const useProductAssemblyGroupState = () =>
  useContext(ProductAssemblyGroupContext)

function reducer(
  state: AssemblyOptionGroupState,
  action: DispatchAction
): AssemblyOptionGroupState {
  switch (action.type) {
    case 'OPTIN': {
      const { groupPath } = action.args
      const groupState = path(groupPath, state) as AssemblyOptionGroupState

      groupState.optin = !groupState.optin

      return { ...state }
    }
    case 'SET_INPUT_VALUE': {
      const { groupPath, inputValue, inputValueLabel } = action.args
      const groupState = path(groupPath, state) as AssemblyOptionGroupState

      groupState.valuesOfInputValues = {
        ...groupState.valuesOfInputValues,
        [inputValueLabel]: inputValue,
      }

      return { ...state }
    }
    case 'SET_QUANTITY': {
      if (!state.items) {
        return state
      }

      const { itemId, newQuantity, type, groupPath } = action.args
      const groupState = path(groupPath, state) as AssemblyOptionGroup

      if (type === GROUP_TYPES.SINGLE) {
        groupState.items = removeAllItems(groupState.items)
      }

      const newItems = {
        ...groupState.items,
        ...(itemId && groupState.items && groupState.items[itemId]
          ? { [itemId]: { ...groupState.items[itemId], quantity: newQuantity } }
          : {}),
      }

      const newQuantitySum = Object.values(newItems).reduce(
        (acc, { quantity }) => acc + quantity,
        0
      )

      groupState.quantitySum = newQuantitySum
      groupState.items = newItems

      return { ...state }
    }
    default:
      return state
  }
}

function removeAllItems(items: Record<string, AssemblyItem>) {
  return Object.keys(items).reduce<Record<string, AssemblyItem>>(
    (acc, itemId) => {
      acc[itemId] = {
        ...items[itemId],
        quantity: 0,
      }
      return acc
    },
    {}
  )
}
