import { Component } from 'react'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'

import ProductCustomizerWrapper from './ProductCustomizerWrapper';

class ProductCustomizerContainer extends Component {

  parseProduct(product) {
    const items =
      product.items.reduce(
        (items, sku) => ({ ...items, [sku.name]: this.parseSku(sku) }), {})
    return { items }
  }

  parseSku(sku) {
    const calculatedAttachments = JSON.parse(sku.calculatedAttachments)
    const names = Object.keys(calculatedAttachments.items)
    const attachments =
      names.reduce(
        (items, name) => ({ ...items, [name]: this.parseAttachment(name, calculatedAttachments) }), {})
    return { attachments }
  }

  parseAttachment(name, attachments) {
    return {
      name,
      items: this.parseAttchmentItems(attachments.items[name]),
      properties: {
        ...attachments.properties[name],
        required: attachments.required.includes(name),
      }
    }
  }

  parseAttchmentItems(items) {
    return items.reduce((acc, item) => ({ ...acc, [item.name]: item }), {})
  }

  render() {
    const { product } = this.props.productQuery
    if (!product) {
      return null
    }

    return <ProductCustomizerWrapper product={this.parseProduct(product)} />
  }
}

export default orderFormConsumer(ProductCustomizerContainer)
