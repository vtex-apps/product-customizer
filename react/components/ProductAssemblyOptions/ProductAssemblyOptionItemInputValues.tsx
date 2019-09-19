import React, { FC, Fragment } from 'react'
import { useProductAssemblyGroupState } from '../ProductAssemblyContext/Group'
import TextInputValue from './InputValue/TextInputValue'
import OptionsInputValue from './InputValue/OptionsInputValue'
import BooleanInputValue from './InputValue/BooleanInputValue'
import { InputValueType } from '../../modules/inputValueType'

const ProductAssemblyOptionItemInputValues: FC = () => {
  const { inputValues } = useProductAssemblyGroupState() as AssemblyOptionGroupState

  return (
    <Fragment>
      {inputValues.map((inputValue, index) => {
        if (inputValue.type === InputValueType.TEXT) {
          return <TextInputValue key={index} inputValueInfo={inputValue} />
        }

        if (inputValue.type === InputValueType.OPTIONS) {
          return <OptionsInputValue key={index} inputValueInfo={inputValue} />
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