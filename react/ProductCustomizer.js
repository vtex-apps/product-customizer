import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'
import { and, complement, head, isEmpty, isNil } from 'ramda'

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

    let hasSchema
    const { calculatedAttachments } = head(product.items)

    try {
      const schema = JSON.parse(calculatedAttachments)
      hasSchema = complement(and(isEmpty, isNil))(schema.properties)
    } catch (e) {
      hasSchema = false
    }

    if (!hasSchema) {
      return <ProductDetails {...this.props} />
    }

    return <ProductCustomizer {...this.props} />
  }
}

export default ProductCustomizerIndex
