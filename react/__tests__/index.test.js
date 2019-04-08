import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import ProductCustomizer from '../index'
import productQueryWithVariation from '../__mocks__/productQueryWithVariation.json'
import productQueryNoVariation from '../__mocks__/productQuery.json'

describe('ProductCustomizer components ', () => {
  it('render with variations example, show sku selector', () => {
    const productQuery = { ...productQueryWithVariation.data }
    const component = render(<ProductCustomizer productQuery={productQuery} />)
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('render with no variations and press on Small SKU', () => {
    const productQuery = { ...productQueryNoVariation.data }
    const component = render(<ProductCustomizer productQuery={productQuery} />)
    expect(component).toBeDefined()
    const { getByText } = component
    expect(component.asFragment()).toMatchSnapshot()

    const smallButton = getByText('Small')
    fireEvent.click(smallButton)
    expect(component.asFragment()).toMatchSnapshot()
  })
})
