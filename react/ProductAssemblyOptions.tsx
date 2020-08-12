import React, { FC, Fragment } from 'react'

import useAssemblyOptions from './modules/useAssemblyOptions'
import ProductAssemblyOptionsGroup from './components/ProductAssemblyOptions/ProductAssemblyOptionsGroup'
import { ProductAssemblyGroupContextProvider } from './components/ProductAssemblyContext/Group'

interface Props {
  initiallyOpened?: boolean
}

const ProductAssemblyOptions: FC<Props> = ({ children, initiallyOpened }) => {
  const assemblyOptions = useAssemblyOptions()

  if (!assemblyOptions) {
    return null
  }

  return (
    <Fragment>
      {Object.keys(assemblyOptions).map((assemblyOptionId) => (
        <ProductAssemblyGroupContextProvider
          key={assemblyOptionId}
          assemblyOption={assemblyOptions[assemblyOptionId]}
        >
          <ProductAssemblyOptionsGroup initiallyOpened={initiallyOpened}>
            {children}
          </ProductAssemblyOptionsGroup>
        </ProductAssemblyGroupContextProvider>
      ))}
    </Fragment>
  )
}
export default ProductAssemblyOptions
