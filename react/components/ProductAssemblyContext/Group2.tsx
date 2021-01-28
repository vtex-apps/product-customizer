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
  }
}

type OptinAction = {
  type: 'OPTIN'
}

export function reducer(
  state: AssemblyState,
  action: DispatchAction
): AssemblyState {
  switch (action.type) {
    case 'OPTIN': {
      return {
        ...state,
        optin: !!state.optin,
      }
    }

    case 'SET_INPUT_VALUE': {
      const { inputValueLabel, inputValue } = action.args

      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [inputValueLabel]: inputValue,
        },
      }
    }

    case 'SET_QUANTITY': {
      const { itemId, newQuantity } = action.args

      let quantityUpdated = false
      const newSelectedItems: SelectedAssemblyItems[] = state.selectedItems.map(
        (item) => {
          if (item.id === itemId) {
            quantityUpdated = true

            return {
              id: itemId,
              quantity: newQuantity,
            }
          }

          if (state.groupInfo.type === GROUP_TYPES.SINGLE) {
            return {
              ...item,
              quantity: 0,
            }
          }

          return item
        }
      )

      if (!quantityUpdated) {
        newSelectedItems.push({
          id: itemId,
          quantity: newQuantity,
        })
      }

      const newTotalQuantitySelected = newSelectedItems.reduce(
        (total, item) => total + item.quantity,
        0
      )

      return {
        ...state,
        totalQuantitySelected: newTotalQuantitySelected,
        selectedItems: newSelectedItems,
      }
    }

    default:
      return state
  }
}
