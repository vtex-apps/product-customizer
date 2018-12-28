import React, { Fragment, Component } from 'react'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'

import SkuSelector from './SkuSelector'
import AttachmentsPicker from './AttachmentsPicker'
import AddToCart from '../Buttons/AddToCart'

class ProductCustomizerWrapper extends Component {
  state = {
    selectedSku: null,
    chosenAttachments: {},
    isAddingToCart: false,
  }

  handleSkuChange = item =>
    this.setState({
      selectedSku: item,
      chosenAttachments: this.getQuantitiesFromSkuAttachments(item),
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
        ({ ...quantities, [itemName]: { id: item.id, quantity: +item.defaultQuantity } }),
      {}
    )

  handleAttachmentChange = (attachmentName, quantities) =>
    this.setState(
      state => ({
        chosenAttachments: {
          ...state.chosenAttachments,
          [attachmentName]: quantities,
        },
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
      (total, { price, quantity }) => total + (price * quantity),
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
          ? quantities[name].quantity
          : +item.defaultQuantity
        return [
          total + quantity,
          { ...obj, [name]: { ...item, quantity } },
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
    const { quantity, properties: { minTotalItems, maxTotalItems } } = attachment
    return quantity >= minTotalItems && quantity <= maxTotalItems
  }

  getAssemblyOptions = () => {
    const { chosenAttachments } = this.state

    const options = []
    Object.entries(chosenAttachments).map(([suffix, attachObj]) => {
      Object.values(attachObj).map(({ id, quantity }) => {
        if (quantity > 0) {
          options.push({ type: suffix, id, quantity })
        }
      })
    })
    return options
  }

  handleSubmitAddToCart = async () => {
    const { orderFormContext, product } = this.props
    const { selectedSku } = this.state

    this.setState({ isAddingToCart: true })

    const skuData = product.items[selectedSku]
    const { skuId, assemblyIdPreffix } = skuData

    try {
      await orderFormContext.addItem({
        variables: {
          orderFormId: orderFormContext.orderForm.orderFormId,
          items: [{ id: skuId, quantity: 1, seller: product.sellerId, options: this.getAssemblyOptions(), assemblyOptionPreffix: assemblyIdPreffix }],
        },
      })
      await orderFormContext.refetch()
      const minicartButton = document.querySelector('.vtex-minicart .vtex-button')
      minicartButton && minicartButton.click()
    } catch (err) {
      //TODO send to splunk
    }
    this.setState({ isAddingToCart: false })
  }

  render() {
    const { imageUrl, items, productName } = this.props.product
    const { selectedSku, chosenAttachments, isAddingToCart } = this.state

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
          onSkuChange={this.handleSkuChange} />
        {selectedSku && <AttachmentsPicker
          attachments={attachments}
          onAttachmentChange={this.handleAttachmentChange} />}
        <AddToCart ready={ready} total={total} onClick={this.handleSubmitAddToCart} isLoading={isAddingToCart} />
      </Fragment>
    )
  }
}

export default orderFormConsumer(ProductCustomizerWrapper)
