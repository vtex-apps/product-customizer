import React, { Fragment, Component } from 'react'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'
import smoothscroll from 'smoothscroll-polyfill'
import { withToast } from 'vtex.styleguide'
import { injectIntl } from 'react-intl'
import { pathOr } from 'ramda'

import SkuSelector from './SkuSelector'
import AttachmentsPicker from './AttachmentsPicker'
import MovingBottomButton from '../Buttons/MovingBottomButton'
import { scrollToElementTop } from '../../utils/scroll'

class ProductCustomizerWrapper extends Component {
  state = {
    selectedSku: null,
    chosenAttachments: {},
    isAddingToCart: false,
  }

  attachmentView = React.createRef()

  componentDidMount() {
    smoothscroll.polyfill()
  }

  handleSkuChange = item => {
    this.setState({
      selectedSku: item,
      chosenAttachments: this.getQuantitiesFromSkuAttachments(item),
    })
    scrollToElementTop(this.attachmentView.current)
  }

  getQuantitiesFromSkuAttachments = (sku) =>
    Object.entries(this.props.product.items[sku].attachments).reduce(
      (quantities, [attName, attachment]) =>
        ({ ...quantities, [attName]: this.getQuantitiesFromItems(attachment.items) }),
      {}
    )

  getQuantitiesFromItems = items =>
    Object.entries(items).reduce(
      (quantities, [itemName, item]) =>
        ({ ...quantities, [itemName]: { id: item.id, quantity: +item.initialQuantity, seller: item.seller } }),
      {}
    )

  handleAttachmentChange = (attachmentName, quantities, isSingleChoice, callback) => 
    this.setState(
      state => ({
        chosenAttachments: {
          ...state.chosenAttachments,
          [attachmentName]: {
            ...state.chosenAttachments[attachmentName] && !isSingleChoice,
            ...quantities,
          },
        },
      }),
      () => callback && callback(this.state.chosenAttachments)
    )

  getTotalPrice(attachments) {
    const { selectedSku } = this.state
    const baseValue = this.props.product.items[selectedSku].price
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
          : +item.initialQuantity
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
    const { chosenAttachments, selectedSku } = this.state
    const { product } = this.props

    const options = []
    Object.entries(chosenAttachments).map(([suffix, attachObj]) => {
      const assemblyId = product.items[selectedSku].attachments[suffix].assemblyId
      Object.entries(attachObj).map(([name, { id, quantity, seller }]) => {
        const initialQuantity = 
         pathOr(0, ['items', selectedSku, 'attachments', suffix, 'items', name, 'initialQuantity'], product)
        if (quantity !== initialQuantity) {
          options.push({ assemblyId, id, quantity, seller })
        }
      })
    })
    return options
  }

  showToast = success => {
    const suffix = success ? 'buy-success' : 'add-failure'
    const message = this.props.intl.formatMessage({ id: `product-customizer.${suffix}` })
    this.props.showToast({ message })
  }

  handleSubmitAddToCart = async () => {
    const { orderFormContext, product } = this.props
    const { selectedSku } = this.state

    this.setState({ isAddingToCart: true })

    const skuData = product.items[selectedSku]
    const { skuId, seller } = skuData

    try {
      await orderFormContext.addItem({
        variables: {
          orderFormId: orderFormContext.orderForm.orderFormId,
          items: [{ id: skuId, quantity: 1, seller, options: this.getAssemblyOptions() }],
        },
      })

      this.showToast(true)
      const minicartButton = document.querySelector('.vtex-minicart .vtex-button')
      minicartButton && minicartButton.click()
    } catch (err) {
      this.showToast(false)
      // TODO send to splunk
    }
    await orderFormContext.refetch()
    this.setState({ isAddingToCart: false })
  }

  render() {
    const { imageUrl, items, productName } = this.props.product
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
              items={items}
              selectedSku={selectedSku}
              onSkuChange={this.handleSkuChange}
            />
            <div ref={this.attachmentView}>
              {selectedSku && (
                <AttachmentsPicker
                  attachments={attachments}
                  selectedSku={selectedSku}
                  onAttachmentChange={this.handleAttachmentChange}
                  chosenAttachments={chosenAttachments} />
              )}
            </div>
            <MovingBottomButton ready={ready} total={total} handleSubmitAddToCart={this.handleSubmitAddToCart} isLoading={isAddingToCart} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(withToast(orderFormConsumer(ProductCustomizerWrapper)))
