import React, { Fragment, Component } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import { withToast } from 'vtex.styleguide'
import { injectIntl } from 'react-intl'
import { compose, pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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

  handleSkuChange = (item, shouldScroll) => {
    this.setState({
      selectedSku: item,
      chosenAttachments: this.getQuantitiesFromSkuAttachments(item),
    })
    item && shouldScroll && scrollToElementTop(this.attachmentView.current)
  }

  getQuantitiesFromSkuAttachments = (sku) => sku ?
    Object.entries(this.props.product.items[sku].attachments).reduce(
      (quantities, [attName, attachment]) =>
        ({ ...quantities, [attName]: this.getQuantitiesFromItems(attachment.items) }),
      {}
    ) : {}

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

  getChoiceType = ({ isSingleChoice, isToggleChoice }) => {
    if (isSingleChoice) {
      return 'SINGLE'
    }
    if (isToggleChoice) {
      return 'TOGGLE'
    }
    return 'MULTIPLE'
  }

  getAssemblyOptions = () => {
    const { chosenAttachments, selectedSku } = this.state
    const { product } = this.props
    console.log('teste props: ', this.props)
    console.log('teste state: ', this.state)

    const options = []
    const added = []
    const removed = []
    Object.entries(chosenAttachments).map(([suffix, attachObj]) => {
      const attachmentTypeInfo = product.items[selectedSku].attachments[suffix]
      const { assemblyId } = attachmentTypeInfo
      // const assemblyId = product.items[selectedSku].attachments[suffix].assemblyId
      Object.entries(attachObj).map(([name, { id, quantity, seller }]) => {
        const initialQuantity = 
         pathOr(0, ['items', selectedSku, 'attachments', suffix, 'items', name, 'initialQuantity'], product)

        if (quantity > initialQuantity) {
          added.push({ 
            normalizedQuantity: quantity, 
            extraQuantity: quantity - initialQuantity, 
            choiceType: this.getChoiceType(attachmentTypeInfo),
            item: {
              name,
              sellingPrice: pathOr(0, ['items', selectedSku, 'attachments', suffix, 'items', name, 'price'], product)/100,
              quantity,
              id,
            },
          })
        }

        if (quantity < initialQuantity) {
          removed.push({
            name,
            initialQuantity,
            removedQuantity: initialQuantity - quantity,
          })
        }

        if (quantity !== initialQuantity) {
          options.push({ assemblyId, id, quantity, seller })
        }
      })
    })
    return { options, removed, added }
  }

  showToast = success => {
    const suffix = success ? 'buy-success' : 'add-failure'
    const message = this.props.intl.formatMessage({ id: `product-customizer.${suffix}` })
    this.props.showToast({ message })
  }

  handleSubmitAddToCart = async () => {
    const { product, addToCart } = this.props
    const { selectedSku } = this.state

    this.setState({ isAddingToCart: true })

    const skuData = product.items[selectedSku]
    const { skuId, seller, commertialOffer, skuImageUrl, name, detailUrl } = skuData
    const { options, added, removed } = this.getAssemblyOptions()
    const payload = {
      quantity: 1,
      options,
      id: skuId,
      sellingPrice: commertialOffer.Price,
      listPrice: commertialOffer.ListPrice,
      skuName: name,
      imageUrl: skuImageUrl,
      name,
      detailUrl,
      seller,
      assemblyOptions: {
        added,
        removed,
        parentPrice: commertialOffer.Price,
      },
    }

    try {
      const {
        data: { addToCart: linkStateItems },
      } = await addToCart([payload])
  
      const success =
        linkStateItems &&
        !!linkStateItems.find(({ id }) => id === skuId)
      this.showToast(success)
    } catch (err) {
      this.showToast(false)
      // TODO send to splunk
    }
    
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
            <div className="t-heading-4 c-on-base ph5 pt5-s">{productName}</div>
            <SkuSelector
              items={items}
              selectedSku={selectedSku}
              onSkuChange={this.handleSkuChange}
              productQuery={this.props.productQuery}
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

const withMutation = graphql(
  gql`
    mutation addToCart($items: [MinicartItem]) {
      addToCart(items: $items) @client
    }
  `,
  {
    props: ({ mutate }) => ({
      addToCart: items => mutate({ variables: { items } }),
    }),
  }
)

export default compose(
  injectIntl,
  withToast,
  withMutation,
)(ProductCustomizerWrapper)
