import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import ProductAssemblyOptions from '../../ProductAssemblyOptions'
import productPizza from '../../__mocks__/productPizza.json'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'
import ProductAssemblyOptionItemName from './ProductAssemblyOptionItemName'
import ProductAssemblyOptionItemQuantity from './ProductAssemblyOptionItemQuantity'

const mockUseProduct = useProduct as jest.Mock<ProductContext>

function renderComponent() {
  return render(
    <ProductAssemblyOptions>
      <ProductAssemblyOptionItemName />
      <ProductAssemblyOptionItemQuantity />
    </ProductAssemblyOptions>
  )
}

function queryQuantityInput(container: HTMLElement, itemId: string|number) {
  return container.querySelector(`[data-testid="multipleItemQuantitySelector-${itemId}"] input`)
}

function queryQuantityDecreaseButton(container: HTMLElement, itemId: string|number) {
  return container.querySelector(`[data-testid="multipleItemQuantitySelector-${itemId}"] [aria-label="-"]`) as HTMLButtonElement
}

function queryQuantityIncreaseButton(container: HTMLElement, itemId: string|number) {
  return container.querySelector(`[data-testid="multipleItemQuantitySelector-${itemId}"] [aria-label="+"]`) as HTMLButtonElement
}

mockUseProduct.mockImplementation(() => ({
  product: productPizza.data.product,
  selectedItem: productPizza.data.product.items[0],
  selectedQuantity: 1
}))

test('should allow changing quantity respecting the min and max quantity', () => {
  const { container } = renderComponent()

  const colaId = 110
  const colaDietId = 120

  const colaQuantityInput = queryQuantityInput(container, colaId)!

  // Decrease quantity of Cola from 2 to 1
  fireEvent.change(colaQuantityInput, { target: { value: '1' } })
  
  // Check if increase button is enable to go back to 2
  const colaIncreaseButton = queryQuantityIncreaseButton(container, colaId)!
  expect(colaIncreaseButton.disabled).toBeFalsy()

  // Should also be able to increase another item
  const colaDietIncreaseButton = queryQuantityIncreaseButton(container, colaDietId)!
  expect(colaDietIncreaseButton.disabled).toBeFalsy()

  // Increase Cola Diet to quantity 1
  const colaDietQuantityInput = queryQuantityInput(container, colaDietId)!
  fireEvent.change(colaDietQuantityInput, { target: { value: '1' }})

  // Make sure you can't add more quantity of any item
  expect(colaIncreaseButton.disabled).toBeTruthy()
  expect(colaDietIncreaseButton.disabled).toBeTruthy()
})