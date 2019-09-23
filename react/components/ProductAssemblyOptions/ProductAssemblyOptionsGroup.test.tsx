import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import ProductAssemblyOptions from '../../ProductAssemblyOptions'
import InputValue from './ProductAssemblyOptionInputValues'
import productAttachment from '../../__mocks__/productAttachment.json'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import ProductAssemblyOptionItemName from './ProductAssemblyOptionItemName'

const mockedUseProductDispatch = useProductDispatch as jest.Mock<() => jest.Mock>
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
      selectedQuantity: 1
    }))
  })

  test('should NOT show Add Customization and Remove button', () => {
    const { queryByText } = renderComponent()
  
    const addButton = queryByText(/Add Customization/)
    expect(addButton).toBeFalsy()

    const removeButton = queryByText(/Remove/)
    expect(removeButton).toBeFalsy()
  })

  test('should show child elements', () => {
    const { getByText, getByLabelText } = renderComponent()
  
    getByText(/Customization/)
    getByLabelText(/Font/)
  })
})

describe('Product with not required assembly', () => {
  beforeEach(() => {
    mockUseProduct.mockImplementation(() => ({
      product: productAttachment.data.product,
      selectedItem: productAttachment.data.product.items[0],
      selectedQuantity: 1
    }))
  })

  test('Add Customization and Remove button', () => {
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
})
