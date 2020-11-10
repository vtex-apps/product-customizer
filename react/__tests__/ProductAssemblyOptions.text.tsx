import React from 'react'
import { fireEvent, render, waitFor } from '@vtex/test-tools/react'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'

import ProductAssemblyOptions from '../ProductAssemblyOptions'
import InputValue from '../ProductAssemblyOptionInputValues'
import productSubscription from '../__fixtures__/productSubscription.json'

const mockUseProduct = useProduct as jest.Mock<ProductContext>

mockUseProduct.mockImplementation(() => ({
  product: productSubscription.data.product,
  selectedItem: productSubscription.data.product.items[0],
  selectedQuantity: 1,
}))

test('localizes subscription labels', async () => {
  const { getByText, container } = render(
    <ProductAssemblyOptions>
      <InputValue optionsDisplay="box" />
    </ProductAssemblyOptions>
  )

  const btn = getByText(/add subscription/i)

  fireEvent.click(btn)

  await waitFor(() =>
    expect(
      getByText(
        productSubscription.data.product.itemMetadata.items[0]
          .assemblyOptions[0].inputValues[0].defaultValue
      )
    ).toBeInTheDocument()
  )

  expect(container).toMatchSnapshot()
})
