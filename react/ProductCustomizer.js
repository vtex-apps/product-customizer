import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'

import './global.css'
import SkuGroupList from './components/SkuGroupList'
import AddToCart from './components/Buttons/AddToCart'
import ChangeToppings from './components/Buttons/ChangeToppings'
import IngredientsContent from './components/IngredientsContent'
import ProductCustomizerService from './utils/ProductCustomizerService'

class ProductCustomizer extends Component {
  static propTypes = {
    productQuery: PropTypes.object,
    orderFormContext: contextPropTypes,
    canChangeToppings: PropTypes.bool,
  }

  static defaultProps = {
    canChangeToppings: true,
  }

  state = {
    total: 0,
    isModalOpen: false,
    extraVariations: [],
    isOpenChangeIngredients: false,
  }

  constructor(props) {
    super(props)

    const attachments = this.parseAttachments()
    // REFATORAR SERVICE PARA BUSCAR ITEMS OBRIGATÓRIOS E OPCIONAIS
    console.log(attachments)
  }

  parseAttachments = () => {
    const {
      productQuery: {
        product,
      },
    } = this.props

    return product.items.map(item => {
      const service = new ProductCustomizerService(JSON.parse(item.calculatedAttachments))

      return {
        skuId: item.itemId,
        ...service.serialize(),
      }
    })
  }

  /**
  * handleToggleChangeIngredients
  * Show the ingredients selection
  * @return void
  */
  handleToggleChangeIngredients = () => {
    this.setState({ isChangeIngredients: true })
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

  handleSelectedVariation = (variationObject) => {
    return this.setState({
      selectedVariation: {
        skuId: variationObject.skuId,
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
      return accumulator + item.variation.price * item.quantity
    }, 0)

    this.setState({ total: totalVariation + totalExtraVariations })
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
          { id: selectedVariation.skuId, quantity: 1, seller: 1 },
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
      canChangeToppings,
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
                skuId={product.itemId}
                skus={product.items}
                onVariationChange={this.handleVariationChange}
              />
            </div>
            <IngredientsContent onVariationChange={this.handleSelectedExtraVariations} currentVariation={selectedVariation} isOpen={isChangeIngredients} onClose={this.handleCloseChangeIngredients} />
            <div className="vtex-product-customizer__actions absolute bottom-0 left-0 right-0 bt b--light-gray">
              <ChangeToppings isVariationSelected={isVariationSelected} canChangeToppings={canChangeToppings} onClick={this.handleToggleChangeIngredients} />
              <AddToCart isVariationSelected={isVariationSelected} total={total} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default orderFormConsumer(ProductCustomizer)
