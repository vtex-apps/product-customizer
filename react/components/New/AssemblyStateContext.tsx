import React, { FC, useContext, useReducer } from 'react'

type AssemblyStateContextType = Map<string[], AssemblyState>

const AssemblyStateContext = React.createContext<AssemblyStateContextType>(
  new Map()
)

type AssemblyStateAction = SetQuantityAction | SetInputValueAction | OptinAction

type SetQuantityAction = {
  type: 'SET_QUANTITY'
  args: {
    assemblyPath: string[]
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

const AssemblyStateDispatchContext = React.createContext<
  React.Dispatch<AssemblyStateAction>
>(() => {})

interface AssemblyStateProviderProps {
  productId: string
  options: Record<string, ItemAssembly>
}

const reducer = (
  state: AssemblyStateContextType,
  action: AssemblyStateAction
): AssemblyStateContextType => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export const AssemblyStateProvider: FC<AssemblyStateProviderProps> = ({
  productId,
  options,
  children,
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    { productId, options },
    createState
  )

  return (
    <AssemblyStateContext.Provider value={state}>
      <AssemblyStateDispatchContext.Provider value={dispatch}>
        {children}
      </AssemblyStateDispatchContext.Provider>
    </AssemblyStateContext.Provider>
  )
}

export const useAssemblyState = (
  assemblyPath: string[]
): AssemblyState | undefined => {
  const state = useContext(AssemblyStateContext)
  return state.get(assemblyPath)
}

export const useAssemblyStateDispatch = (assemblyPath: string[]) => {
  const dispatch = useContext(AssemblyStateDispatchContext)
  return dispatch
}

interface CreateStateArgs {
  productId: string
  options: Record<string, ItemAssembly>
}

export function createState({
  productId,
  options,
}: CreateStateArgs): AssemblyStateContextType {
  const initialState = createItemAssemblyOptionsState(productId, [], options)

  const assembly = initialState.reduce((acc, state) => {
    acc.set(state.assemblyPath, state)
    return acc
  }, new Map())

  return assembly
}

function createItemAssemblyOptionsState(
  productId: string,
  path: string[],
  allItems: Record<string, ItemAssembly>
): AssemblyState[] {
  const product = allItems[productId]
  const states: AssemblyState[] = []

  for (const option of product.options) {
    // Create a state for each option of the item
    const optionPath = [...path, productId, option.id]
    const optionState = createAssemblyState(optionPath, productId, option)
    states.push(optionState)

    if (!option.composition) {
      continue
    }

    // Recurse in the items of the items
    for (const item of option.composition.items) {
      states.push(
        ...createItemAssemblyOptionsState(item.id, optionPath, allItems)
      )
    }
  }

  return states
}

function createAssemblyState(
  assemblyPath: string[],
  productId: string,
  option: AssemblyOptionGroup
): AssemblyState {
  let totalQuantitySelected = 0
  const selectedItems: SelectedAssemblyItem[] = []
  if (option.composition) {
    for (const item of option.composition.items) {
      if (item.initialQuantity === 0) continue

      selectedItems.push({
        id: item.id,
        quantity: item.initialQuantity,
      })

      totalQuantitySelected += item.initialQuantity
    }
  }

  const inputValues: AssemblyState['inputValues'] = {}
  if (option.inputValues?.length > 0) {
    for (const inputValue of option.inputValues) {
      inputValues[inputValue.label] = inputValue.defaultValue
        ? inputValue.defaultValue
        : ''
    }
  }

  return {
    productId,
    assemblyPath,

    totalQuantitySelected,
    selectedItems,

    inputValues,
    optin: option.required,
  }
}
