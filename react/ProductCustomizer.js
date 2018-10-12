import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'vtex.styleguide/Modal'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'

import './global.css'
import SkuGroupList from './components/SkuGroupList'
import AddToCart from './components/Buttons/AddToCart'
import ChangeToppings from './components/Buttons/ChangeToppings'
import IngredientsContent from './components/IngredientsContent'
import ProductCustomizerService from './utils/ProductCustomizerService'

class ProductCustomizer extends Component {
  static propTypes = {
    /* Enable user change the optional variations */
    canChangeToppings: PropTypes.bool,
    /* Handle order informations */
    orderFormContext: contextPropTypes,
    /* Product data with calculated attachments */
    productQuery: PropTypes.object.isRequired,
  }

  static defaultProps = {
    canChangeToppings: true,
  }

  state = {
    total: 0,
    choosedAmount: {},
    isModalOpen: false,
    extraVariations: [],
    isOpenChangeIngredients: false,
  }

  /**
  * parseAttachments
  * Parse attachments into a readable object.
  * @param string type
  * @param object sku
  * @return object
  */
  parseAttachments = (type, sku) => {
    const service = new ProductCustomizerService(JSON.parse(sku.calculatedAttachments))

    if (type === 'required') {
      return {
        ...sku,
        variations: service.parseRequiredVariations(),
      }
    }

    if (type === 'composition') {
      const composition = service.getBasicCompositionBySku()

      return {
        minTotalItems: composition.minTotalItems,
        maxTotalItems: composition.maxTotalItems,
        variations: composition.variations,
      }
    }

    const optionals = service.parseOptionalVariations()

    return {
      skuId: sku.itemId,
      minTotalItems: optionals.minTotalItems,
      maxTotalItems: optionals.maxTotalItems,
      variations: optionals.variations,
    }
  }

  /**
  * handleOpenModal
  * Show the ingredients selection.
  * @return void
  */
  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  /**
  * handleCloseModal
  * Close the ingredients selection.
  * @return void
  */
  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  /**
  * handleVariationChange
  * Call optional variations parser and calculates the total.
  * @param object variationObject
  * @return void
  */
  handleVariationChange = async variationObject => {
    await this.handleSelectedVariation(variationObject)
    this.handleParseOptionalVariationsBySkuId(variationObject.skuId)
    this.calculateTotalFromSelectedVariation()
  }

  /**
  * handleParseOptionalVariationsBySkuId
  * Create the index state of numeric stepper.
  * @param string skuId
  * @return void
  */
  handleParseOptionalVariationsBySkuId = skuId => {
    const {
      productQuery: {
        product,
      },
    } = this.props

    const sku = product.items.find(sku => {
      return sku.itemId === skuId
    })
    const optionalVariations = this.parseAttachments('optionals', sku)
    const compositionVariations = this.parseAttachments('composition', sku)

    this.createNumericStepperIndexesStates(optionalVariations.variations)
    this.setState({ optionalVariations })
    this.setState({ compositionVariations })
  }

  /**
  * createNumericStepperIndexesStates
  * Create the initial state of Numeric Stepper Component.
  * @param array items
  * @return void
  */
  createNumericStepperIndexesStates = items => {
    const choosedAmount = {}

    items.forEach(item => {
      choosedAmount[item.name] = 0
    })

    this.setState({ choosedAmount })
  }

  /**
  * onHandleNumericStepperChange
  * Sets the optional variation values by index.
  * @param object variationObject
  * @return void
  */
  onHandleNumericStepperChange = variationObject => {
    const {
      choosedAmount,
    } = this.state

    choosedAmount[variationObject.index] = variationObject.quantity

    this.setState({ choosedAmount })
  }

  /**
  * handleSelectedVariation
  * Resets extra variations state and update the current variation selected.
  * @param object variationObject
  * @return void
  */
  handleSelectedVariation = variationObject => {
    this.setState({ extraVariations: [] })

    return this.setState({
      selectedVariation: {
        skuId: variationObject.skuId,
        variation: variationObject.variation,
        quantity: variationObject.quantity,
      },
    })
  }

  /**
  * handleSelectedExtraVariations
  * Add the changed optional variation and call the calculate method
  * @param object variationObject
  * @return void
  */
  handleSelectedExtraVariations = async variationObject => {
    const currentExtraVariations = this.state.extraVariations
    const key = currentExtraVariations.findIndex(extraVariation => {
      return extraVariation.index === variationObject.index
    })

    this.onHandleNumericStepperChange(variationObject)

    if (key === -1) {
      currentExtraVariations.push(variationObject)
    } else {
      if (variationObject.quantity !== 0) {
        currentExtraVariations[key] = variationObject
      } else {
        currentExtraVariations.splice(key)
      }
    }

    await this.setState({ extraVariations: currentExtraVariations })
    this.calculateTotalFromSelectedVariation()
  }

  /**
  * calculateTotalFromSelectedVariation
  * Calculates the total based on all items selected.
  * @return void
  */
  calculateTotalFromSelectedVariation = () => {
    const {
      extraVariations,
      selectedVariation: {
        quantity,
        variation,
      },
    } = this.state

    const totalVariation = (variation.price / 100) * quantity
    const totalExtraVariations = extraVariations.reduce((accumulator, item) => {
      const parsedPrice = parseFloat(item.variation.price / 100).toFixed(2)
      return accumulator + parsedPrice * item.quantity
    }, 0)

    this.setState({ total: totalVariation + totalExtraVariations })
  }

  /**
  * handleOnSubmitForm
  * Create an object based on selected variations and send to Order Form.
  * @return void
  */
  handleOnSubmitForm = e => {
    e.preventDefault()

    const {
      orderFormContext,
    } = this.props

    const {
      selectedVariation,
    } = this.state

    const service = new ProductCustomizerService()
    service.updateAttachmentStringBySelections(this.state)

    orderFormContext.addItem({
      variables: {
        orderFormId: orderFormContext.orderForm.orderFormId,
        items: [
          { id: selectedVariation.skuId, quantity: 1, seller: 1 },
        ],
      },
    })
      .then(() => {
        orderFormContext.refetch()
        this.handleCloseModal()
      })
  }

  /**
  * render
  * Render the urrent component.
  * @return <Component> ProductCustomizer
  */
  render() {
    const {
      canChangeToppings,
      productQuery: {
        product,
      },
    } = this.props

    const {
      total,
      isModalOpen,
      choosedAmount,
      selectedVariation,
      optionalVariations,
      isChangeIngredients,
      compositionVariations
    } = this.state

    const isVariationSelected = !!selectedVariation
    const requiredVariations = product.items.map(sku => {
      return this.parseAttachments('required', sku)
    })

    return (
      <div className="vtex-product-customizer relative flex-ns h-100-ns">
        <h1 className="vtex-product-customizer__title tc f4 fw5 ma0 pa5 w-100 bg-black-40 white dn-ns">{product.productName}</h1>
        <div className="w-100 w-third-ns flex-ns tc items-center-ns pa5 h-100-ns">
          <img
            className="vtex-product-customizer__image br3"
            alt="Product Customize Image"
            src={product.items[0].images[0].imageUrl}
          />
        </div>
        <div className="w-100 w-two-thirds-ns flex-ns flex-column-ns relative-ns">
          <h1 className="vtex-product-customizer__title fw5 ma0 f3 pa5 dn db-ns">{product.productName}</h1>
          <div className="pb5-ns pt0-ns ph5-ns  ph5 pb5 bb b--light-gray">
            <p className="ma0 fw3">{product.description}</p>
          </div>
          <div className="vtex-product-customizer__options bg-light-gray bg-transparent-ns overflow-auto">
            <h4 className="ma0 pv3 ph5">
              <FormattedMessage id="product-customizer.select-variation" />
            </h4>
            <SkuGroupList
              skus={requiredVariations}
              onVariationChange={this.handleVariationChange}
            />
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={this.handleCloseModal}
          >
            <IngredientsContent
              choosedAmount={choosedAmount}
              currentVariation={selectedVariation}
              optionalVariations={optionalVariations}
              onClose={this.handleCloseChangeIngredients}
              compositionVariations={compositionVariations}
              onVariationChange={this.handleSelectedExtraVariations}
            />
            <AddToCart onSubmit={this.handleOnSubmitForm} isVariationSelected={isVariationSelected} total={total} isModalOpen={isModalOpen} />
          </Modal>
          <div className="vtex-product-customizer__actions fixed bg-white bottom-0 left-0 right-0 bt b--light-gray">
            <ChangeToppings
              isVariationSelected={isVariationSelected}
              canChangeToppings={!isModalOpen && canChangeToppings}
              onClick={this.handleOpenModal}
            />
            <AddToCart onSubmit={this.handleOnSubmitForm} isVariationSelected={isVariationSelected} total={total} />
          </div>
        </div>
      </div>
    )
  }
}

export default orderFormConsumer(ProductCustomizer)
