import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'vtex.styleguide/Modal'
import Button from 'vtex.styleguide/Button'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'

import './global.css'
import schema from './__mock__/index.json'
import SkuGroupList from './components/SkuGroupList'
import AddToCart from './components/Buttons/AddToCart'
import ChangeToppings from './components/Buttons/ChangeToppings'
import IngredientsContent from './components/IngredientsContent'
import ProductCustomizerService from './utils/ProductCustomizerService'

class ProductCustomizer extends Component {
  static propTypes = {
    productQuery: PropTypes.object,
    orderFormContext: contextPropTypes,
    enableChangeToppings: PropTypes.bool,
  }

  static defaultProps = {
    enableChangeToppings: true,
  }

  state = {
    total: 0,
    variations: [],
    isModalOpen: false,
    extraVariations: [],
    isOpenChangeIngredients: false,
  }

  /**
  * constructor
  * Initialize the parent class contructor and parse the data from Schema
  * @return void
  */
  constructor(props) {
    super(props)

    const service = new ProductCustomizerService(schema)
    this.state.variations = service.serializeData()
  }

  /**
  * handleOpenModal
  * Show the product modal
  * @return void
  */
  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  /**
  * handleCloseModal
  * Close the product modal
  * @return void
  */
  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  /**
  * handleToggleChangeIngredients
  * Show the ingredients selection
  * @return void
  */
  handleToggleChangeIngredients = () => {
    const {
      isChangeIngredients,
    } = this.state

    this.setState({ isChangeIngredients: !isChangeIngredients })
  }

  /**
  * handleCloseChangeIngredients
  * Close the ingredients selection
  * @return void
  */
  handleCloseChangeIngredients = () => {
    this.setState({ isChangeIngredients: false })
  }

  handleVariationChange = async (variationObject) => {
    await this.handleSelectedVariation(variationObject)

    this.calculateTotalFromSelectedVariation()
  }

  calculateTotalFromSelectedVariation = () => {
    const {
      extraVariations,
      selectedVariation: {
        quantity,
        variation,
      },
    } = this.state

    const totalVariation = variation.price * quantity || 19.90 * quantity
    const totalExtraVariations = extraVariations.reduce((accumulator, item) => {
      const total = item.variation.price * item.quantity

      return accumulator + total
    }, 0)

    this.setState({ total: totalVariation + totalExtraVariations })
  }

  handleSelectedVariation = (variationObject) => {
    return this.setState({
      selectedVariation: {
        variation: variationObject.variation,
        quantity: variationObject.quantity,
      },
    })
  }

  handleSelectedExtraVariations = async variationObject => {
    const currentExtraVariations = this.state.extraVariations

    const key = currentExtraVariations.findIndex(extraVariation => {
      return extraVariation.index === variationObject.index
    })

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

  handleOnSubmitForm = e => {
    e.preventDefault()

    const {
      orderFormContext,
    } = this.props

    const {
      selectedVariation,
    } = this.state

    orderFormContext.addItem({
      variables: {
        orderFormId: orderFormContext.orderForm.orderFormId,
        items: [
          { id: selectedVariation.variation.id, quantity: 1, seller: 1 },
        ],
      },
    })
      .then(() => {
        orderFormContext.refetch()
        this.handleCloseModal()
      })
  }

  render() {
    const {
      enableChangeToppings,
      productQuery: {
        product,
      },
    } = this.props

    const {
      total,
      selectedVariation,
      isChangeIngredients,
    } = this.state

    const isVariationSelected = !!selectedVariation

    return (
      <div>
        <Button onClick={this.handleOpenModal}>Change yourself</Button>

        <Modal
          centered
          isOpen={this.state.isModalOpen}
          onClose={this.handleCloseModal}
        >
          <div className="flex-ns h-100-ns">
            <h1 className="vtex-product-customizer__title tc f4 fw5 ma0 pa5 w-100 bg-black-40 white dn-ns">{product.productName}</h1>
            <div className="w-100 w-third-ns flex-ns tc items-center-ns pa5 h-100-ns">
              <img
                className="vtex-product-customizer__image br3"
                alt="Product Customize Image"
                src={product.items[0].images[0].imageUrl}
              />
            </div>
            <div className="w-100 w-two-thirds-ns flex-ns flex-column-ns">
              <form name="vtex-product-customizer-form" onSubmit={this.handleOnSubmitForm}>
                <h1 className="vtex-product-customizer__title fw5 ma0 f3 pa5 dn db-ns">{product.productName}</h1>
                <div className="pb5-ns pt0-ns ph5-ns  ph5 pb5 bb b--light-gray">
                  <p className="ma0 fw3">{product.description}</p>
                </div>
                <div className="vtex-product-customizer__options bg-light-gray bg-transparent-ns overflow-auto">
                  <h4 className="ma0 pv3 ph5">
                    <span className="f5 fw5">Select item variation</span>
                  </h4>
                  <SkuGroupList
                    skus={product.items}
                    onVariationChange={this.handleVariationChange}
                  />
                </div>
                <IngredientsContent onVariationChange={this.handleSelectedExtraVariations} currentVariation={selectedVariation} isOpen={isChangeIngredients} onClose={this.handleCloseChangeIngredients} />
                <div className="vtex-product-customizer__actions bt b--light-gray">
                  <ChangeToppings isVariationSelected={isVariationSelected} enableChangeToppings={enableChangeToppings} onClick={this.handleToggleChangeIngredients} />
                  <AddToCart isVariationSelected={isVariationSelected} total={total} />
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default orderFormConsumer(ProductCustomizer)
