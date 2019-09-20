import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import ProductAssemblyOptions from '../../ProductAssemblyOptions'
import InputValue from './ProductAssemblyOptionItemInputValues'
import productAttachment from '../../__mocks__/productAttachment.json'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import ProductAssemblyOptionItemName from './ProductAssemblyOptionItemName'

const mockedUseProductDispatch = useProductDispatch as jest.Mock<() => jest.Mock>
const mockUseProduct = useProduct as jest.Mock<ProductContext>

function renderComponent(customProps = {}) {
  return render(
    <ProductAssemblyOptions>
      <ProductAssemblyOptionItemName />
      <InputValue {...customProps}/>
    </ProductAssemblyOptions>
  )
}

mockUseProduct.mockImplementation(() => ({
  product: productAttachment.data.product,
  selectedItem: productAttachment.data.product.items[6],
  selectedQuantity: 1
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
  const { getByText} = renderComponent({ optionsDisplay: 'box' })

  getByText(/Sans serif/)

  const romanOption = getByText(/Roman/)
  fireEvent.click(romanOption)

  const lastCall = mockedDispatch.mock.calls[mockedDispatch.mock.calls.length - 1]
  expect(lastCall[0].args.groupInputValues['Font']).toBe('Roman')
})

test('should trigger changes to Product Context', () => {
  const { getByLabelText } = renderComponent()

  const font = getByLabelText(/Font/) as HTMLSelectElement
  fireEvent.change(font, { target: { value: 'Roman' } })
  const frontText = getByLabelText(/Front text/) as HTMLInputElement
  fireEvent.change(frontText, { target: { value: 'Foobar' } })
  const glossyPrint = getByLabelText(/Glossy print/) as HTMLInputElement
  fireEvent.click(glossyPrint)

  expect(mockedDispatch.mock.calls).toHaveLength(4)
  expect(mockedDispatch.mock.calls[0][0].type).toBe('SET_ASSEMBLY_OPTIONS')
  expect(mockedDispatch.mock.calls[0][0].args.groupInputValues.Font).toBe('Sans serif')
  expect(mockedDispatch.mock.calls[0][0].args.groupInputValues['Front text']).toBe('')
  expect(mockedDispatch.mock.calls[0][0].args.groupInputValues['Back text']).toBe('')
  expect(mockedDispatch.mock.calls[0][0].args.groupInputValues['Glossy print']).toBe(true)
  
  expect(mockedDispatch.mock.calls[1][0].args.groupInputValues.Font).toBe('Roman')
  expect(mockedDispatch.mock.calls[2][0].args.groupInputValues['Front text']).toBe('Foobar')
  expect(mockedDispatch.mock.calls[3][0].args.groupInputValues['Glossy print']).toBe(false)
})
