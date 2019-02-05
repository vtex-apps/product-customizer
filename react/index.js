import React, { Component } from 'react'
import { keys, head } from 'ramda'

import { Spinner } from 'vtex.styleguide'
import { ExtensionPoint } from 'vtex.render-runtime'

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
    const schema = calculatedAttachments && JSON.parse(calculatedAttachments)
    const hasSchema = !!(schema && schema.properties && keys(schema.properties).length)

    if (!hasSchema) {
      return <ProductCustomizer {...this.props} />
    }
    return <ExtensionPoint id="product-details" {...this.props} />
  }
}

export default ProductCustomizerIndex
