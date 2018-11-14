import { mergeDeepRight } from 'ramda'
import React, { Fragment, Component } from 'react'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'

import SkuSelector from './SkuSelector';
import AttachmentsPicker from './AttachmentsPicker';

class ProductCustomizerWrapper extends Component {
  state = {
    selectedSku: null,
    chosenAttachments: {},
  }

  onSkuChange = item =>
    this.setState({
      selectedSku: item,
      chosenAttachments: this.getQuantitiesFromSkuAttachments(item)
    })

  getQuantitiesFromSkuAttachments = (sku) =>
    Object.entries(this.props.product.items[sku].attachments).reduce(
      (quantities, [attName, attachment]) =>
        ({ ...quantities, [attName]: { items: this.getQuantitiesFromItems(attachment.items) } }),
      {}
    )

  getQuantitiesFromItems = items =>
    Object.entries(items).reduce(
      (quantities, [itemName, item]) =>
        ({ ...quantities, [itemName]: { quantity: +item.defaultQuantity } }),
      {}
    )

  onAttachmentChange = (attachmentName, items) =>
    this.setState(
      state => ({
        chosenAttachments: {
          ...state.chosenAttachments,
          [attachmentName]: { items }
        }
      })
    )

  render() {
    const { items } = this.props.product
    const { selectedSku, chosenAttachments } = this.state
    return (
      <Fragment>
        <SkuSelector
          items={Object.keys(items)}
          onSkuChange={this.onSkuChange} />
        {selectedSku && <AttachmentsPicker
          attachments={mergeDeepRight(items[selectedSku].attachments, chosenAttachments)}
          onAttachmentChange={this.onAttachmentChange} />}
      </Fragment>
    )
  }
}

export default orderFormConsumer(ProductCustomizerWrapper)
