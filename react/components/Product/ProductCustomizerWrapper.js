import React, { Fragment, Component } from 'react'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'

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
        ({ ...quantities, [itemName]: { id: item.id, quantity: +item.defaultQuantity, seller: item.seller } }),
      {}
    )

  handleAttachmentChange = (attachmentName, quantities) => 
    this.setState(
      state => ({
        chosenAttachments: {
          ...state.chosenAttachments,
          [attachmentName]: {
            ...state.chosenAttachments[attachmentName],
            ...quantities,
          },
        },
      })
    )

  getTotalPrice(attachments) {
    const { selectedSku } = this.state
    const baseValue = this.props.product.parentComertials[selectedSku].Price
    return Object.values(attachments).reduce(
      (total, attachment) => total + this.getAttachmentPrice(attachment),
      baseValue * 100
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
      Object.values(attachObj).map(({ id, quantity, seller }) => {
        if (quantity > 0) {
          options.push({ type: suffix, id, quantity, seller })
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
      // TODO send to splunk
    }
    this.setState({ isAddingToCart: false })
  }

  render() {
    const { imageUrl, items, productName, parentComertials } = this.props.product
    const { selectedSku, chosenAttachments, isAddingToCart } = this.state

    const attachments = selectedSku && this.getAttachmentsWithQuantities(items[selectedSku].attachments, chosenAttachments)
    const ready = attachments && this.isSkuReady(attachments)
    const total = attachments && this.getTotalPrice(attachments)

    return (
      <Fragment>
        <div className="flex-ns pv6-ns justify-center-ns">
          <div className="w-100 w-third-ns flex tc items-center-ns h-100-ns ph2-ns">
            <img className="vtex-product-customizer__image" src={imageUrl} />
          </div>
          <div className="w-40-ns ph2-ns">
            <div className="t-heading-5 c-on-base ph5 pt5-s">{productName}</div>
            <SkuSelector
              items={Object.keys(items)}
              selectedSku={selectedSku}
              onSkuChange={this.handleSkuChange}
              skuCommertialOffer={selectedSku && parentComertials[selectedSku]}
            />
            {selectedSku && (
              <AttachmentsPicker
                attachments={attachments}
                onAttachmentChange={this.handleAttachmentChange} />
            )}
            <div className="vtex-product-customizer__actions fixed bg-white bottom-0 left-0 right-0 bt b--light-gray">
              <AddToCart ready={ready} total={total} onClick={this.handleSubmitAddToCart} isLoading={isAddingToCart} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default orderFormConsumer(ProductCustomizerWrapper)
