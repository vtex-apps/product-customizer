import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'
import { head } from 'ramda'

import { Spinner } from 'vtex.styleguide'
import { ExtensionPoint } from 'vtex.render-runtime'

import ProductCustomizer from './components/ProductCustomizer'
import ProductCustomizerPreview from './components/ProductCustomizerPreview';

class ProductCustomizerIndex extends Component {
  render() {
    const { productQuery: { loading, product } } = this.props

    if (loading) return (
      <div className="flex justify-center pa8 w-100">
        <Spinner />
      </div>
    )

    const { attachments } = head(product.items)
    const hasAttachments = attachments && attachments.length > 0

    if (hasAttachments) {
      if (loading) {
        return <ProductCustomizerPreview {...this.props} />
      }
      return <ProductCustomizer {...this.props} />
    }

    return <ExtensionPoint id="product-details" {...this.props} />
  }
}

export default ProductCustomizerIndex
