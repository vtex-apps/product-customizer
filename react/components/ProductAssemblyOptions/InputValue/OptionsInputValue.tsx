import React, { FC, useMemo } from 'react'
import { Dropdown } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { useIntl } from 'react-intl'

import { useProductAssemblyGroupState } from '../../ProductAssemblyContext/Group'
import useInputValue from './useInputValue'
import OptionBox from './OptionBox'
import {
  formatSubscriptionLabel,
  formatSubscriptionOptions,
  isSubscription,
} from '../../../modules/subscriptions'

const DROPDOWN_OPTIONS_HANDLES = ['optionsInputValueDropdown'] as const
const BOX_OPTIONS_HANDLES = [
  'optionsInputValue',
  'optionsInputValueLabelContainer',
  'optionsInputValueLabel',
  'optionsInputValueOptionBoxContainer',
] as const

export type OptionDisplay = 'select' | 'box' | 'smart'

type Options = {
  label: string
  value: string
}

type InnerProps = {
  label: string
  options: Options[]
  inputId: string
}

type Props = {
  optionsDisplay?: OptionDisplay
  inputValueInfo: OptionsInputValue
}

const DropdownOptions: FC<InnerProps> = ({ label, options, inputId }) => {
  const [state, onChange] = useInputValue(inputId)
  const handles = useCssHandles(DROPDOWN_OPTIONS_HANDLES)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    onChange({ value })
  }

  return (
    <div className={`${handles.optionsInputValueDropdown} mb4`}>
      <Dropdown
        value={state}
        onChange={handleChange}
        label={label}
        options={options}
      />
    </div>
  )
}

const BoxOptions: FC<InnerProps> = ({ label, options, inputId }) => {
  const [state, onChange] = useInputValue(inputId)
  const handles = useCssHandles(BOX_OPTIONS_HANDLES)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const selected = state as string
    const selectedIndex: number = options.findIndex((i) => i.value === selected)

    switch (event.key) {
      case 'ArrowRight': {
        const count = options.length
        const nextSelectedIndex = (selectedIndex + 1) % count
        const newOption = options[nextSelectedIndex]

        onChange({ value: newOption.value })
        break
      }

      case 'ArrowLeft': {
        const count = options.length
        // Linter is triggering a false positive here :/
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const previousSelectedIndex = (selectedIndex - 1 + count) % count
        const newOption = options[previousSelectedIndex]

        onChange({ value: newOption.value })
        break
      }

      case 'Home': {
        const [newOption] = options

        onChange({ value: newOption.value })
        break
      }

      case 'End': {
        const count = options.length
        const newOption = options[count - 1]

        onChange({ value: newOption.value })
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
          {label}
        </span>
      </div>
      <div
        className={`${handles.optionsInputValueOptionBoxContainer} inline-flex flex-wrap flex items-center`}
      >
        {options.map((option) => {
          return (
            <OptionBox
              key={option.value}
              onKeyDown={handleKeyDown}
              option={option.label}
              selected={state === option.value}
              onClick={() => onChange({ value: option.value })}
            />
          )
        })}
      </div>
    </div>
  )
}

const OptionsInputValue: FC<Props> = ({
  optionsDisplay = 'select',
  inputValueInfo,
}) => {
  const intl = useIntl()
  const state = useProductAssemblyGroupState()
  const inputId = inputValueInfo.label
  const inputDomain = inputValueInfo.domain
  const isSubscriptionOption = isSubscription(inputId)

  // We get the current `frequency` value here instead of inside the useMemo
  // so it doesn't depend on the state, as it is a new object at every update.
  // For non-subscription inputValues, this is `undefined` which is fine.
  // Prevents re-rendering when changing `purchaseDay`.
  const frequency = state?.valuesOfInputValues[
    'vtex.subscription.key.frequency'
  ] as string

  const { label, options } = useMemo(() => {
    // not a subscription, just map the options
    if (!isSubscriptionOption) {
      return {
        label: inputId,
        options: inputDomain.map((value) => ({ label: value, value })),
      }
    }

    return {
      label: formatSubscriptionLabel(inputId, intl),
      options: formatSubscriptionOptions({
        inputId,
        inputDomain,
        frequency,
        intl,
      }),
    }
  }, [isSubscriptionOption, inputId, inputDomain, frequency, intl])

  const OptionComponent =
    optionsDisplay === 'box' ? BoxOptions : DropdownOptions

  return (
    <OptionComponent
      inputId={inputValueInfo.label}
      label={label}
      options={options}
    />
  )
}

export default OptionsInputValue
