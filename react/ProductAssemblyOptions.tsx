import React, { FC, Fragment } from 'react'

import useAssemblyOptions from './modules/useAssemblyOptions'
import ProductAssemblyOptionsGroup from './components/ProductAssemblyOptions/ProductAssemblyOptionsGroup'
import { ProductAssemblyGroupContextProvider } from './components/ProductAssemblyContext/Group'

const ProductAssemblyOptions: FC = ({ children }) => {
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
          <ProductAssemblyOptionsGroup>{children}</ProductAssemblyOptionsGroup>
        </ProductAssemblyGroupContextProvider>
      ))}
    </Fragment>
  )
}
export default ProductAssemblyOptions
