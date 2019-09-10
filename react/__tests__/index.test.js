import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import ProductCustomizer from '../index'
import productQueryWithVariation from '../__mocks__/productQueryWithVariation.json'
import productQueryNoVariation from '../__mocks__/productQuery.json'

describe('ProductCustomizer components ', () => {
  it('render with variations example, show sku selector', () => {
    const productQuery = { ...productQueryWithVariation.data }
    const { container, asFragment } = render(
      <ProductCustomizer productQuery={productQuery} />
    )

    expect(container).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
  })

  it('render with no variations and press on Small SKU', () => {
    const productQuery = { ...productQueryNoVariation.data }
    const { container, getByText, asFragment } = render(
      <ProductCustomizer productQuery={productQuery} />
    )

    expect(container).toBeDefined()
    expect(asFragment()).toMatchSnapshot()

    const smallButton = getByText('Small')
    fireEvent.click(smallButton)
    expect(asFragment()).toMatchSnapshot()
  })
})
