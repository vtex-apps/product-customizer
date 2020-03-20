import { renderHook } from '@testing-library/react-hooks'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'

import parseAssemblyOptions from './useAssemblyOptions'
import productAttachment from '../__fixtures__/productAttachment.json'

const mockUseProduct = useProduct as jest.Mock<ProductContext>

test('it should return inputValues', () => {
  mockUseProduct.mockImplementation(() => ({
    product: productAttachment.data.product,
    selectedItem: productAttachment.data.product.items[0],
    selectedQuantity: 1,
  }))

  const { result } = renderHook(() => parseAssemblyOptions())
  const value = result.current!

  expect(value.Customization).toBeDefined()
  expect(value.Customization.inputValues).toBe(
    productAttachment.data.product.itemMetadata.items[0].assemblyOptions[0]
      .inputValues
  )
  expect(value.Customization.required).toBe(false)
})

test('it should return inputValues of the selected SKU', () => {
  mockUseProduct.mockImplementation(() => ({
    product: productAttachment.data.product,
    selectedItem: productAttachment.data.product.items[6],
    selectedQuantity: 1,
  }))

  const { result } = renderHook(() => parseAssemblyOptions())
  const value = result.current!

  expect(value.Customization).toBeDefined()
  expect(value.Customization.inputValues).toBe(
    productAttachment.data.product.itemMetadata.items[2].assemblyOptions[0]
      .inputValues
  )
  expect(value.Customization.required).toBe(true)
})
