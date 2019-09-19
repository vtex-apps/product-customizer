import { useProductAssemblyGroupState, useProductAssemblyGroupDispatch } from '../../ProductAssemblyContext/Group'

interface OnChangeParams {
  value: string
}

export default function useInputValue(inputValueInfo: InputValue): [string, (param: OnChangeParams) => void] {
  const { path, valuesOfInputValues } = useProductAssemblyGroupState() as AssemblyOptionGroupState
  const dispatch = useProductAssemblyGroupDispatch()

  const onChange = ({ value }: OnChangeParams) => {
    dispatch({
      type: 'SET_INPUT_VALUE',
      args: {
        inputValueLabel: inputValueInfo.label,
        inputValue: value,
        groupPath: path
      }
    })
  }

  const value = valuesOfInputValues[inputValueInfo.label]

  return [value, onChange]
}

export function useInputValueId(inputValueInfo: InputValue) {
  const { path } = useProductAssemblyGroupState() as AssemblyOptionGroupState

  return inputValueInfo.label + path.join('-')
}