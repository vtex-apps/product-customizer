import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'
import { path } from 'ramda'
import { ExtensionPoint } from 'vtex.render-runtime'

import ProductCustomizerContainer from './components/Product/ProductCustomizerContainer'

class ProductCustomizerIndex extends Component {
  hasAttachments = () => {
    const metadataItems = path(
      ['product', 'itemMetadata', 'items'],
      this.props.productQuery
    )
    if (!metadataItems) {
      return false
    }
    return metadataItems.some(
      ({ assemblyOptions }) => assemblyOptions && assemblyOptions.length > 0
    )
  }

  render() {
    const {
      productQuery: { loading },
    } = this.props

    if (loading)
      return (
        <div className="flex justify-center pa8 w-100">
          <Spinner />
        </div>
      )

    if (this.hasAttachments()) {
      return <ProductCustomizerContainer {...this.props} />
    }

    return <ExtensionPoint id="product-details" {...this.props} />
  }
}

export default ProductCustomizerIndex
