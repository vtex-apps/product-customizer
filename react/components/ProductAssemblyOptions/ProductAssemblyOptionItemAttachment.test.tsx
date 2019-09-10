import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductAssemblyOptions from '../../ProductAssemblyOptions'
import Attachment from './ProductAssemblyOptionItemAttachment'
import productPizza from '../../__mocks__/productPizza.json'
import useProduct, { ProductContext } from 'vtex.product-context/useProduct'
import ProductAssemblyOptionItemName from './ProductAssemblyOptionItemName'

const mockUseProduct = useProduct as jest.Mock<ProductContext>

function renderComponent() {
  return render(
    <ProductAssemblyOptions>
      <ProductAssemblyOptionItemName />
      <Attachment />
    </ProductAssemblyOptions>
  )
}

mockUseProduct.mockImplementation(() => ({
  product: productPizza.data.product,
  selectedItem: productPizza.data.product.items[0],
  selectedQuantity: 1
}))

test('something', () => {
  const { debug } = renderComponent()

  debug()
})