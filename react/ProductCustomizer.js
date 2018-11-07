import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'
import { keys, head } from 'ramda'

import ProductDetails from 'vtex.product-details/ProductDetails'
import ProductCustomizer from './components/ProductCustomizer'

class ProductCustomizerIndex extends Component {
  render() {
    const { productQuery: { loading, product } } = this.props

    if (loading) return (
      <div className="flex justify-center pa8 w-100">
        <Spinner />
      </div>
    )

    const { calculatedAttachments } = head(product.items)
    const schema = JSON.parse(calculatedAttachments)
    const hasSchema = !!(schema && schema.properties && keys(schema.properties).length)

    if (!hasSchema) {
      return <ProductDetails {...this.props} />
    }

    return <ProductCustomizer {...this.props} />
  }
}

export default ProductCustomizerIndex
