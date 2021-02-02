import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import ProductAssemblyOptions from '../../ProductAssemblyOptions'
import productPizza from '../../__fixtures__/productPizza.json'
import productHamburguer from '../../__fixtures__/productHamburguer.json'
import ProductAssemblyOptionItemName from './ProductAssemblyOptionItemName'
import ProductAssemblyOptionItemQuantity from './ProductAssemblyOptionItemQuantity'
import ProductAssemblyOptionItemCustomize from '../../ProductAssemblyOptionItemCustomize'

const mockUseProduct = useProduct as jest.Mock<ProductContext>
const mockedUseProductDispatch = useProductDispatch as jest.Mock<
  () => jest.Mock
>

let mockedDispatch = jest.fn()

beforeEach(() => {
  mockedDispatch = jest.fn()
  mockedUseProductDispatch.mockImplementation(() => mockedDispatch)
  mockUseProduct.mockReset()
})

const ItemNameAndQuantity = () => (
  <>
    <ProductAssemblyOptionItemName />
    <ProductAssemblyOptionItemQuantity />
  </>
)

function renderComponent() {
  return render(
    <ProductAssemblyOptions>
      <ItemNameAndQuantity />

      <ProductAssemblyOptionItemCustomize>
        <ItemNameAndQuantity />

        <ProductAssemblyOptionItemCustomize>
          <ItemNameAndQuantity />
        </ProductAssemblyOptionItemCustomize>
      </ProductAssemblyOptionItemCustomize>
    </ProductAssemblyOptions>
  )
}

function queryQuantityInput(container: HTMLElement, itemId: string | number) {
  return container.querySelector(
    `[data-testid="multipleItemQuantitySelector-${itemId}"] input`
  )
}

function queryQuantityIncreaseButton(
  container: HTMLElement,
  itemId: string | number
) {
  return container.querySelector(
    `[data-testid="multipleItemQuantitySelector-${itemId}"] [aria-label="+"]`
  ) as HTMLButtonElement
}

function getLastMockedDispatchArgs(dispatch: jest.Mock) {
  return dispatch.mock.calls[dispatch.mock.calls.length - 1][0].args
}

test('should allow changing quantity respecting the min and max quantity', () => {
  mockUseProduct.mockImplementation(() => ({
    product: productPizza.data.product,
    selectedItem: productPizza.data.product.items[0],
    selectedQuantity: 1,
  }))

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
  const colaDietIncreaseButton = queryQuantityIncreaseButton(
    container,
    colaDietId
  )!

  expect(colaDietIncreaseButton.disabled).toBeFalsy()

  // Increase Cola Diet to quantity 1
  const colaDietQuantityInput = queryQuantityInput(container, colaDietId)!

  fireEvent.change(colaDietQuantityInput, { target: { value: '1' } })

  // Make sure you can't add more quantity of any item
  expect(colaIncreaseButton.disabled).toBeTruthy()
  expect(colaDietIncreaseButton.disabled).toBeTruthy()
})

test('Check deep assembly options quantity', () => {
  window.scroll = () => {}
  mockUseProduct.mockImplementation(() => ({
    product: productHamburguer.data.product,
    selectedItem: productHamburguer.data.product.items[0],
    selectedQuantity: 1,
  }))

  const { getAllByText, getByText, getAllByLabelText } = renderComponent()

  const [sndComboOneCustomize, _, fstComboOneCustomize] = getAllByText(
    'Customize'
  )

  // Open combo2combo1 customization to select lanche generico
  fireEvent.click(sndComboOneCustomize)
  // Select lanche generico
  fireEvent.click(getAllByText('Lanche Genérico')[0])
  fireEvent.click(getByText('Done'))

  const mockedDispatchCallsFirstLength = mockedDispatch.mock.calls.length
  const [combo2Combo1] = getLastMockedDispatchArgs(mockedDispatch).groupItems

  // Expect Combo2-Combo1 to be selected
  expect(combo2Combo1.quantity).toBe(1)
  // Check if Lanche Generico is selected and Big Macct isn't
  expect(combo2Combo1.children['Combo 1_Lanche'][1].quantity).toBe(1)
  expect(combo2Combo1.children['Combo 1_Lanche'][0].quantity).toBe(0)

  // ------ TEST COMBO 1 COMBO 1
  // Open combo1combo1 customization to select lanche generico
  fireEvent.click(fstComboOneCustomize)
  // Select lanche generico
  fireEvent.click(getAllByText('Lanche Genérico')[1])

  const [combo1Combo1] = getLastMockedDispatchArgs(mockedDispatch).groupItems

  // Expect Combo1-Combo1 to be selected
  expect(combo1Combo1.quantity).toBe(1)
  // Check if Lanche Generico is selected and Big Macct isn't
  expect(combo1Combo1.children['Combo 1_Lanche'][1].quantity).toBe(1)
  expect(combo1Combo1.children['Combo 1_Lanche'][0].quantity).toBe(0)

  // Assure that dispatch is called
  expect(mockedDispatch.mock.calls).not.toHaveLength(
    mockedDispatchCallsFirstLength
  )

  // Check deepest child test -> Combo 2 -> Combo 1 -> Lanche Genérico -> Bacon
  const lancheGenericoCustomize = getAllByText('Customize')[5]

  fireEvent.click(lancheGenericoCustomize)
  fireEvent.click(getByText('Add Extra'))
  fireEvent.click(getAllByLabelText('+')[0])
  const combo2Combo1Extra = getLastMockedDispatchArgs(mockedDispatch)
    .groupItems[0].children['Combo 1_Lanche'][1].children.Extra_Extra

  expect(combo2Combo1Extra[0].initialQuantity).toBe(0)
  expect(combo2Combo1Extra[0].quantity).toBe(1)
  expect(combo2Combo1Extra[1].quantity).toBe(0)
})
