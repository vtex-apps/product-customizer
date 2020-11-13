import React from 'react'
import { fireEvent, render } from '@vtex/test-tools/react'
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
  const { getByText } = render(
    <ProductAssemblyOptions>
      <InputValue optionsDisplay="box" />
    </ProductAssemblyOptions>
  )

  const btn = getByText(/add subscription/i)

  fireEvent.click(btn)

  expect(getByText('Every 7 days')).toBeInTheDocument()
  expect(getByText('Every day')).toBeInTheDocument()
  expect(getByText('Every 2 months')).toBeInTheDocument()
  expect(getByText('Every year')).toBeInTheDocument()
  expect(getByText('Every 2 years')).toBeInTheDocument()

  expect(getByText(/Monday/i)).toBeInTheDocument()
  expect(getByText(/Tuesday/i)).toBeInTheDocument()
  expect(getByText(/Saturday/i)).toBeInTheDocument()
})

test('replaces weekdays for numeric days', async () => {
  const { getByText, queryByText } = render(
    <ProductAssemblyOptions>
      <InputValue optionsDisplay="box" />
    </ProductAssemblyOptions>
  )

  const btn = getByText(/add subscription/i)

  fireEvent.click(btn)
  fireEvent.click(getByText('Every 2 months'))

  expect(queryByText(/Sunday/i)).not.toBeInTheDocument()
  expect(queryByText(/Tuesday/i)).not.toBeInTheDocument()
  expect(queryByText(/Saturday/i)).not.toBeInTheDocument()

  expect(queryByText(/1st/)).toBeInTheDocument()
  expect(queryByText(/2nd/)).toBeInTheDocument()
  expect(queryByText(/6th/)).toBeInTheDocument()
})
