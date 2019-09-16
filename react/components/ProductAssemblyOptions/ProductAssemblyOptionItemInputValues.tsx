import React, { FC, Fragment } from 'react'
import { useProductAssemblyGroupState } from '../ProductAssemblyContext/Group'
import TextInputValue from './InputValue/TextInputValue'
import OptionsInputValue from './InputValue/OptionsInputValue'
import BooleanInputValue from './InputValue/BooleanInputValue'

const ProductAssemblyOptionItemInputValues: FC = () => {
  const { inputValues } = useProductAssemblyGroupState() as AssemblyOptionGroupType

  return (
    <Fragment>
      {inputValues.map((inputValue, index) => {
        if (inputValue.type === 'TEXT') {
          return <TextInputValue key={index} inputValueInfo={inputValue as TextInputValue} />
        }

        if (inputValue.type === 'OPTIONS') {
          return <OptionsInputValue key={index} inputValueInfo={inputValue as OptionsInputValue} />
        }

        if (inputValue.type === 'BOOLEAN') {
          return <BooleanInputValue key={index} inputValueInfo={inputValue as BooleanInputValue} />
        }

        return null
      })}
    </Fragment>
  )
}

export default ProductAssemblyOptionItemInputValues