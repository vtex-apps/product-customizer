import React, { FC, useMemo } from 'react'
import { Dropdown } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import useInputValue from './useInputValue'
import OptionBox from './OptionBox'

const DROPDOWN_OPTIONS_HANDLES = ['optionsInputValueDropdown'] as const
const BOX_OPTIONS_HANDLES = [
  'optionsInputValue',
  'optionsInputValueLabelContainer',
  'optionsInputValueLabel',
  'optionsInputValueOptionBoxContainer',
] as const

const DropdownOptions: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)
  const handles = useCssHandles(DROPDOWN_OPTIONS_HANDLES)

  const handleChange = (e: any) => {
    const { value } = e.target
    onChange({ value })
  }

  const options = useMemo(() => {
    return inputValueInfo.domain.map(option => ({
      value: option,
      label: option,
    }))
  }, [inputValueInfo.domain])

  return (
    <div className={`${handles.optionsInputValueDropdown} mb4`}>
      <Dropdown
        value={state}
        onChange={handleChange}
        label={inputValueInfo.label}
        options={options}
      />
    </div>
  )
}

const BoxOptions: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)
  const handles = useCssHandles(BOX_OPTIONS_HANDLES)

  const handleKeyDown = (event: KeyboardEvent) => {
    const selected = state as string
    const options = inputValueInfo.domain
    const selectedIndex = options.indexOf(selected)

    switch (event.key) {
      case 'ArrowRight': {
        const count = options.length
        const nextSelectedIndex = (selectedIndex + 1) % count
        const newValue = options[nextSelectedIndex]
        onChange({ value: newValue })
        break
      }
      case 'ArrowLeft': {
        const count = options.length
        const previousSelectedIndex = (selectedIndex - 1 + count) % count
        const newValue = options[previousSelectedIndex]
        onChange({ value: newValue })
        break
      }
      case 'Home': {
        const newValue = options[0]
        onChange({ value: newValue })
        break
      }
      case 'End': {
        const count = options.length
        const newValue = options[count - 1]
        onChange({ value: newValue })
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <div className={`${handles.optionsInputValue} mb4`}>
      <div className={`${handles.optionsInputValueLabelContainer} mb3`}>
        <span
          className={`${handles.optionsInputValueLabel} c-muted-1 t-small overflow-hidden`}
        >
          {inputValueInfo.label}
        </span>
      </div>
      <div
        className={`${handles.optionsInputValueOptionBoxContainer} inline-flex flex-wrap flex items-center`}
      >
        {inputValueInfo.domain.map(option => (
          <OptionBox
            key={option}
            onKeyDown={handleKeyDown}
            option={option}
            selected={state === option}
            onClick={() => onChange({ value: option })}
          />
        ))}
      </div>
    </div>
  )
}

const OptionsInputValue: FC<Props> = ({
  optionsDisplay = 'select',
  inputValueInfo,
}) => {
  return optionsDisplay === 'box' ? (
    <BoxOptions inputValueInfo={inputValueInfo} />
  ) : (
    <DropdownOptions inputValueInfo={inputValueInfo} />
  )
}

export type OptionDisplay = 'select' | 'box' | 'smart'

interface Props {
  optionsDisplay?: OptionDisplay
  inputValueInfo: OptionsInputValue
}

export default OptionsInputValue
