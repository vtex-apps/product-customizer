import React from 'react'
import {
  render,
  fireEvent,
  within,
  waitForElementToBeRemoved,
} from '@vtex/test-tools/react'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import ProductAssemblyOptions from '../../ProductAssemblyOptions'
import InputValue from './ProductAssemblyOptionInputValues'
import productAttachment from '../../__fixtures__/productAttachment.json'
import productRecursive from '../../__fixtures__/productRecursive.json'
import ProductAssemblyOptionItemName from './ProductAssemblyOptionItemName'
import ProductAssemblyOptionItemCustomize from './ProductAssemblyOptionItemCustomize'

const mockedUseProductDispatch = useProductDispatch as jest.Mock<
  () => jest.Mock
>
const mockUseProduct = useProduct as jest.Mock<ProductContext>

function renderComponent(customProps = {}) {
  return render(
    <ProductAssemblyOptions>
      <ProductAssemblyOptionItemName />
      <InputValue {...customProps} />
    </ProductAssemblyOptions>
  )
}

mockUseProduct.mockImplementation(() => ({
  product: productAttachment.data.product,
  selectedItem: productAttachment.data.product.items[6],
  selectedQuantity: 1,
}))

let mockedDispatch = jest.fn()
beforeEach(() => {
  mockedDispatch = jest.fn()
  mockedUseProductDispatch.mockImplementation(() => mockedDispatch)
})

test('should handle Options input value', () => {
  const { getByLabelText } = renderComponent()

  const font = getByLabelText(/Font/) as HTMLSelectElement
  fireEvent.change(font, { target: { value: 'Roman' } })

  expect(font.value).toBe('Roman')
})

test('should handle Text input value', () => {
  const { getByLabelText } = renderComponent()

  const frontText = getByLabelText(/Front text/) as HTMLInputElement
  fireEvent.change(frontText, { target: { value: 'Foobar' } })

  expect(frontText.value).toBe('Foobar')
})

test('should handle Boolean input value', () => {
  const { getByLabelText } = renderComponent()

  const glossyPrint = getByLabelText(/Glossy print/) as HTMLInputElement
  fireEvent.click(glossyPrint)

  expect(glossyPrint.checked).toBe(false)
})

test('should show other type of options', () => {
  const { getByText } = renderComponent({ optionsDisplay: 'box' })

  getByText(/Sans serif/)

  const romanOption = getByText(/Roman/)
  fireEvent.click(romanOption)

  const lastCall =
    mockedDispatch.mock.calls[mockedDispatch.mock.calls.length - 1]
  expect(lastCall[0].args.groupInputValues.Font).toBe('Roman')
})

test('should trigger changes to Product Context', () => {
  const { getByLabelText } = renderComponent()

  const font = getByLabelText(/Font/) as HTMLSelectElement
  fireEvent.change(font, { target: { value: 'Roman' } })

  expect(mockedDispatch.mock.calls[0][0].args.groupInputValues.Font).toBe(
    'Roman'
  )
  expect(
    mockedDispatch.mock.calls[0][0].args.groupInputValues['Front text']
  ).toBe('')
  expect(
    mockedDispatch.mock.calls[0][0].args.groupInputValues['Back text']
  ).toBe('')
  expect(
    mockedDispatch.mock.calls[0][0].args.groupInputValues['Glossy print']
  ).toBe(true)

  const frontText = getByLabelText(/Front text/) as HTMLInputElement
  fireEvent.change(frontText, { target: { value: 'Foobar' } })
  const glossyPrint = getByLabelText(/Glossy print/) as HTMLInputElement
  fireEvent.click(glossyPrint)

  expect(mockedDispatch.mock.calls).toHaveLength(4)
  expect(mockedDispatch.mock.calls[0][0].type).toBe('SET_ASSEMBLY_OPTIONS')
  expect(mockedDispatch.mock.calls[1][0].args.groupInputValues.Font).toBe(
    'Roman'
  )
  expect(
    mockedDispatch.mock.calls[2][0].args.groupInputValues['Front text']
  ).toBe('Foobar')
  expect(
    mockedDispatch.mock.calls[3][0].args.groupInputValues['Glossy print']
  ).toBe(false)
})

function renderComponentRecursive() {
  return render(
    <ProductAssemblyOptions>
      <ProductAssemblyOptionItemName />
      <InputValue />
      <ProductAssemblyOptionItemCustomize>
        <ProductAssemblyOptionItemName />
        <InputValue />
      </ProductAssemblyOptionItemCustomize>
    </ProductAssemblyOptions>
  )
}

window.scroll = () => null
window.scrollTo = () => null

test('should keep input values for recursive assemblies', async () => {
  mockUseProduct.mockImplementation(() => ({
    product: productRecursive.data.product,
    selectedItem: productRecursive.data.product.items[0],
    selectedQuantity: 1,
  }))

  const { getByText, getByLabelText } = renderComponentRecursive()

  // Click on button Customize
  const assembly = getByText('Bells add-ons 1-3 lines')
  const customizeButton = assembly.parentElement?.querySelector(
    '.vtex-button'
  ) as HTMLElement
  fireEvent.click(customizeButton)

  // Click on Add 1-3-lines inside the modal
  const modal = within(
    document.querySelector('.vtex-modal__modal') as HTMLElement
  )
  const modalCustomizeButton = modal.getByText('Add 1-3-lines')
  fireEvent.click(modalCustomizeButton)

  // Type "Foobar" in the Input Value "Line 1"
  const input = modal.getByLabelText('Line 1')
  fireEvent.change(input, { target: { value: 'Foobar' } })

  expect(mockedDispatch.mock.calls).toHaveLength(6)
  // eslint-disable-next-line prefer-destructuring
  const [lastCall] = mockedDispatch.mock.calls[5]
  expect(lastCall.type).toBe('SET_ASSEMBLY_OPTIONS')
  expect(lastCall.args.groupInputValues['Line 1']).toBe('Foobar')

  // Close the modal
  fireEvent.click(
    document.querySelector('.vtex-modal__modal .vtex__icon-close') as Element
  )

  // Wait for the close transition to end
  await waitForElementToBeRemoved(() =>
    document.querySelector('.vtex-modal__modal .vtex__icon-close')
  )

  // Click on Customize button to open the modal again
  fireEvent.click(customizeButton)

  // Check if input still set with "Foobar" previously typed
  const inputLine1 = getByLabelText('Line 1') as HTMLInputElement
  expect(inputLine1.value).toBe('Foobar')
})
