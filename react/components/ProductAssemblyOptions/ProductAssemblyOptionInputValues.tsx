import React, { FC, Fragment } from 'react'

import { useProductAssemblyGroupState } from '../ProductAssemblyContext/Group'
import TextInputValue from './InputValue/TextInputValue'
import OptionsInputValue, {
  OptionDisplay,
} from './InputValue/OptionsInputValue'
import BooleanInputValue from './InputValue/BooleanInputValue'
import { InputValueType } from '../../modules/inputValueType'

interface Props {
  optionsDisplay?: OptionDisplay
}

const ProductAssemblyOptionItemInputValues: FC<Props> = ({
  optionsDisplay,
}) => {
  const state = useProductAssemblyGroupState()

  if (!state) {
    return null
  }

  const { inputValues } = state

  return (
    <Fragment>
      {inputValues.map((inputValue, index) => {
        if (inputValue.type === InputValueType.TEXT) {
          return <TextInputValue key={index} inputValueInfo={inputValue} />
        }

        if (inputValue.type === InputValueType.OPTIONS) {
          return (
            <OptionsInputValue
              key={index}
              inputValueInfo={inputValue}
              optionsDisplay={optionsDisplay}
            />
          )
        }

        if (inputValue.type === InputValueType.BOOLEAN) {
          return <BooleanInputValue key={index} inputValueInfo={inputValue} />
        }

        return null
      })}
    </Fragment>
  )
}

export default ProductAssemblyOptionItemInputValues
