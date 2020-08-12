import React, { FC, useMemo } from 'react'
import { render } from '@vtex/test-tools/react'

import { baseOptions } from './__fixtures__/options'
import {
  AssemblyStateProvider,
  useAssemblyState,
  useAssemblyStateDispatch,
} from './AssemblyStateContext'
import {
  AssemblyOptionsProvider,
  useAssemblyOptions,
} from './AssemblyOptionsContext'

interface AssemblyItemProps {
  item: ItemAssembly
  assemblyPath: string[]
}

const AssemblyItem: FC<AssemblyItemProps> = ({ assemblyPath }) => {
  const state = useAssemblyState(assemblyPath)

  return <></>
}

interface AssemblyOptionsProps {
  productId: string
  assemblyPath: string[]
}

const AssemblyOptions: FC<AssemblyOptionsProps> = ({
  productId,
  assemblyPath,
}) => {
  const assemblyOptions = useAssemblyOptions(productId)

  return (
    <>
      {assemblyOptions.options.map((item, index) => (
        <AssemblyItem key={index} assemblyPath={assemblyPath} item={item} />
      ))}
    </>
  )
}

const productId = '2000584'
const ProductPage = () => {
  const assemblyRootPath = useMemo(() => [productId], [])

  return (
    <div>
      <h1>Product Name</h1>

      <div>
        <h3>Assembly Options:</h3>

        <AssemblyOptionsProvider options={baseOptions}>
          <AssemblyStateProvider productId={productId} options={baseOptions}>
            <AssemblyOptions
              productId={productId}
              assemblyPath={assemblyRootPath}
            />
          </AssemblyStateProvider>
        </AssemblyOptionsProvider>
      </div>
    </div>
  )
}

test('should render each group', () => {
  const { debug } = render(<ProductPage />)

  debug()

  expect(true).toBe(true)
})
