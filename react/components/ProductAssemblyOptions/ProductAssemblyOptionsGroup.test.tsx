import React from 'react'
import { render, fireEvent, within } from '@vtex/test-tools/react'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import ProductAssemblyOptions from '../../ProductAssemblyOptions'
import InputValue from './ProductAssemblyOptionInputValues'
import productAttachment from '../../__fixtures__/productAttachment.json'
import ProductAssemblyOptionItemName from './ProductAssemblyOptionItemName'

const mockedUseProductDispatch = useProductDispatch as jest.Mock<
  () => jest.Mock
>
const mockUseProduct = useProduct as jest.Mock<ProductContext>

function renderComponent() {
  return render(
    <ProductAssemblyOptions>
      <ProductAssemblyOptionItemName />
      <InputValue />
    </ProductAssemblyOptions>
  )
}

let mockedDispatch = jest.fn()
beforeEach(() => {
  mockedDispatch = jest.fn()
  mockedUseProductDispatch.mockImplementation(() => mockedDispatch)
  mockUseProduct.mockReset()
})

describe('Product with required assembly', () => {
  beforeEach(() => {
    mockUseProduct.mockImplementation(() => ({
      product: productAttachment.data.product,
      selectedItem: productAttachment.data.product.items[6],
      selectedQuantity: 1,
    }))
  })

  it('should NOT show Add Customization and Remove button', () => {
    const { queryByText } = renderComponent()

    const addButton = queryByText(/Add Customization/)
    expect(addButton).toBeFalsy()

    const removeButton = queryByText(/Remove/)
    expect(removeButton).toBeFalsy()
  })

  it('should show child elements', () => {
    const { getByText, getByLabelText } = renderComponent()

    expect(getByText(/Customization/)).toBeTruthy()
    expect(getByLabelText(/Font/)).toBeTruthy()
  })
})

describe('Product with not required assembly', () => {
  beforeEach(() => {
    mockUseProduct.mockImplementation(() => ({
      product: productAttachment.data.product,
      selectedItem: productAttachment.data.product.items[0],
      selectedQuantity: 1,
    }))
  })

  it('Add Customization and Remove button', () => {
    const { getByLabelText, getByText, queryByLabelText } = renderComponent()

    const addButton = getByText(/Add Customization/)
    fireEvent.click(addButton)

    // Show child elements
    getByLabelText(/Font/)

    const removeButton = getByText(/Remove/)
    fireEvent.click(removeButton)

    // No child elements
    const fontInput = queryByLabelText(/Font/)
    expect(fontInput).toBeFalsy()
  })

  it('object set in product context should be empty if Add customization is not pressed or after remove is pressed', () => {
    const { getByText } = renderComponent()

    expect(mockedDispatch.mock.calls[0][0].args.groupInputValues).toMatchObject(
      {}
    )

    const addButton = getByText(/Add Customization/)
    fireEvent.click(addButton)

    expect(mockedDispatch.mock.calls[1][0].args.groupInputValues).toMatchObject(
      {
        Font: 'Sans serif',
        'Front text': '',
        'Back text': '',
        'Glossy print': true,
      }
    )

    const removeButton = getByText(/Remove/)
    fireEvent.click(removeButton)

    expect(mockedDispatch.mock.calls[2][0].args.groupInputValues).toMatchObject(
      {}
    )
  })
})
