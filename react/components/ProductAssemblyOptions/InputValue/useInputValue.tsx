import {
  useProductAssemblyGroupState,
  useProductAssemblyGroupDispatch,
} from '../../ProductAssemblyContext/Group'

interface OnChangeParams {
  value: string | boolean
}

export default function useInputValue(
  inputId: string
): [string | boolean, (param: OnChangeParams) => void] {
  const {
    path,
    valuesOfInputValues,
  } = useProductAssemblyGroupState() as AssemblyOptionGroupState

  const dispatch = useProductAssemblyGroupDispatch()

  const onChange = ({ value }: OnChangeParams) => {
    dispatch({
      type: 'SET_INPUT_VALUE',
      args: {
        inputValueLabel: inputId,
        inputValue: value,
        groupPath: path,
      },
    })
  }

  const value = valuesOfInputValues[inputId]

  return [value, onChange]
}

export function useInputValueId(inputValueInfo: InputValue) {
  const { path } = useProductAssemblyGroupState() as AssemblyOptionGroupState

  return inputValueInfo.label + path.join('-')
}
