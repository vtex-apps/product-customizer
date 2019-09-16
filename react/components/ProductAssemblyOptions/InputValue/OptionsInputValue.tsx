import React, { FC, useMemo } from 'react'
import { Dropdown } from 'vtex.styleguide'
import useInputValue from './useInputValue'

const OptionsInputValue: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)

  const handleChange = (e: any) => {
    const value = e.target.value
    onChange({ value })
  }

  const options = useMemo(() => {
    return inputValueInfo.domain.map((option) => ({ value: option, label: option }))
  }, [inputValueInfo.domain])

  return (
    <div>
      <Dropdown
        value={state}
        onChange={handleChange}
        label={inputValueInfo.label}
        options={options} />
    </div>
  )
}

interface Props {
  inputValueInfo: OptionsInputValue
}

export default OptionsInputValue