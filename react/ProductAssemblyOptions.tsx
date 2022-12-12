import React, { FC, Fragment } from 'react'

import useAssemblyOptions from './modules/useAssemblyOptions'
import ProductAssemblyOptionsGroup from './components/ProductAssemblyOptions/ProductAssemblyOptionsGroup'
import { ProductAssemblyGroupContextProvider } from './components/ProductAssemblyContext/Group'

interface Props {
  initiallyOpened?: 'always' | 'required'
}

const ProductAssemblyOptions: FC<Props> = ({
  children,
  initiallyOpened = 'required',
}) => {
  const assemblyOptions = useAssemblyOptions()

  if (!assemblyOptions) {
    return null
  }

  return (
    <Fragment>
      {Object.keys(assemblyOptions).map((assemblyOptionId) => (
        <ProductAssemblyGroupContextProvider
          key={assemblyOptionId}
          initiallyOpened={initiallyOpened}
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
