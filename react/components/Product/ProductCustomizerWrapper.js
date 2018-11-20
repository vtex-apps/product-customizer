import React, { Fragment, Component } from 'react'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'

import SkuSelector from './SkuSelector';
import AttachmentsPicker from './AttachmentsPicker';
import AddToCart from '../Buttons/AddToCart';

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
        ({ ...quantities, [attName]: this.getQuantitiesFromItems(attachment.items) }),
      {}
    )

  getQuantitiesFromItems = items =>
    Object.entries(items).reduce(
      (quantities, [itemName, item]) =>
        ({ ...quantities, [itemName]: +item.defaultQuantity }),
      {}
    )

  onAttachmentChange = (attachmentName, quantities) =>
    this.setState(
      state => ({
        chosenAttachments: {
          ...state.chosenAttachments,
          [attachmentName]: quantities
        }
      })
    )

  getTotalPrice(attachments) {
    return Object.values(attachments).reduce(
      (total, attachment) => total + this.getAttachmentPrice(attachment),
      0
    )
  }

  getAttachmentPrice(attachment) {
    return Object.values(attachment.items).reduce(
      (total, {price, quantity}) => total + (price * quantity),
      0
    )
  }

  getAttachmentsWithQuantities(attachments, quantities) {
    return Object.entries(attachments).reduce(
      (obj, [name, attachment]) => 
        ({ ...obj, [name]: this.getAttachmentWithQuantities(attachment, quantities[name]) }),
      {}
    )
  }

  getAttachmentWithQuantities(attachment, quantities) {
    const [quantity, items] = Object.entries(attachment.items).reduce(
      ([total, obj], [name, item]) => {
        const quantity = name in quantities
          ? quantities[name]
          : +item.defaultQuantity
        return [
          total + quantity,
          { ...obj, [name]: { ...item, quantity } }
        ]
      },
      [0, {}]
    )

    return { ...attachment, items, quantity }
  }
  
  isSkuReady(attachments) {
    return Object.values(attachments).every(this.isAttachmentReady)
  }

  isAttachmentReady(attachment) {
    const { quantity, properties: { type, required } } = attachment
    if (required && type === 'string') {
      return quantity === 1
    }
    return true
  }

  render() {
    const { imageUrl, items, productName } = this.props.product
    const { selectedSku, chosenAttachments } = this.state

    const attachments = selectedSku && this.getAttachmentsWithQuantities(items[selectedSku].attachments, chosenAttachments)
    const ready = selectedSku && this.isSkuReady(attachments)
    const total = attachments && this.getTotalPrice(attachments)

    return (
      <Fragment>
        <div className="w-100 w-third-ns flex-ns tc items-center-ns h-100-ns">
          <img className="vtex-product-customizer__image" src={imageUrl} />
        </div>
        <div>{productName}</div>
        <SkuSelector
          items={Object.keys(items)}
          selectedSku={selectedSku}
          onSkuChange={this.onSkuChange} />
        {selectedSku && <AttachmentsPicker
          attachments={attachments}
          onAttachmentChange={this.onAttachmentChange} />}
        <AddToCart ready={ready} total={total} onClick={() => console.log('mock')} isLoading={false} />
      </Fragment>
    )
  }
}

export default orderFormConsumer(ProductCustomizerWrapper)
