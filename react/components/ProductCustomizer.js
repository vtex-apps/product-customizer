import React, { Component } from 'react'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'

import ProductCustomizerContainer from './Product/ProductCustomizerContainer';

class ProductCustomizer extends Component {
  render() {
    return (
      <ProductCustomizerContainer {...this.props} />
    )
  }
}

export default orderFormConsumer(ProductCustomizer)
