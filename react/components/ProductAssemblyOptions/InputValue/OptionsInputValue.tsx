import React, { FC, useMemo } from 'react'
import { Dropdown } from 'vtex.styleguide'
import useInputValue from './useInputValue'
import OptionBox from './OptionBox'

const DropdownOptions: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)

  const handleChange = (e: any) => {
    const value = e.target.value
    onChange({ value })
  }

  const options = useMemo(() => {
    return inputValueInfo.domain.map((option) => ({ value: option, label: option }))
  }, [inputValueInfo.domain])

  return (
    <div className="mb4">
      <Dropdown
        value={state}
        onChange={handleChange}
        label={inputValueInfo.label}
        options={options} />
    </div>
  )
}

const BoxOptions: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)

  return (
    <div className="mb4">
      <div className="mb3">
        <span className="c-muted-1 t-small overflow-hidden">
          {inputValueInfo.label}
        </span>
      </div>
      <div className="inline-flex flex-wrap flex items-center">
        {inputValueInfo.domain.map(option =>
          <OptionBox
            key={option}
            option={option}
            selected={state === option}
            onClick={() => onChange({ value: option })} />
        )}
      </div>
    </div>
  )
}

const OptionsInputValue: FC<Props> = ({ optionsDisplay = 'select', inputValueInfo }) => {
  return optionsDisplay === 'box'
    ? <BoxOptions inputValueInfo={inputValueInfo} />
    : <DropdownOptions inputValueInfo={inputValueInfo} />
}

export type OptionDisplay = 'select' | 'box' | 'smart'

interface Props {
  optionsDisplay?: OptionDisplay
  inputValueInfo: OptionsInputValue
}

export default OptionsInputValue