import React, { FC } from 'react'
import { Checkbox } from 'vtex.styleguide'
import useInputValue, { useInputValueId } from './useInputValue'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [ 'booleanInputValue' ] as const

const BooleanInputValue: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)
  const id = useInputValueId(inputValueInfo)

  const handleChange = (e: any) => {
    const value = e.target.checked
    onChange({ value })
  }

  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className={`${handles.booleanInputValue} mb4`}>
      <Checkbox
        id={id}
        value={inputValueInfo.label}
        checked={Boolean(state)}
        name={inputValueInfo.label}
        label={inputValueInfo.label}
        onChange={handleChange} />
    </div>
  )
}

interface Props {
  inputValueInfo: BooleanInputValue
}

export default BooleanInputValue