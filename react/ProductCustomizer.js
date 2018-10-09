import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'vtex.styleguide/Modal'
import Button from 'vtex.styleguide/Button'

import './global.css'
import schema from './__mock__/index.json'
import SkuGroupList from './components/SkuGroupList'
import AddToCart from './components/Buttons/AddToCart'
import ChangeToppings from './components/Buttons/ChangeToppings'
import IngredientsContent from './components/IngredientsContent'
import ProductCustomizerService from './utils/ProductCustomizerService'

const isMobile = window.__RUNTIME__.hints.mobile

class ProductCustomizer extends Component {
  static propTypes = {
    productQuery: PropTypes.object,
    enableChangeToppings: PropTypes.bool,
  }

  static defaultProps = {
    enableChangeToppings: true,
  }

  state = {
    total: 0,
    variations: [],
    isModalOpen: false,
    isOpenChangeIngredients: false,
  }

  /**
  * constructor
  * Initialize the parent class contructor and parse the data from Schema
  * @return void
  */
  constructor() {
    super()

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

  handleVariationChange = async (variation) => {
    console.log('INDEX COMPONENT: ', variation)

    await this.handleSelectedVariation(variation)

    this.calculateTotal()
  }

  calculateTotal = () => {
    const {
      selectedVariation,
    } = this.state

    this.setState({ total: selectedVariation.price })
  }

  handleSelectedVariation = (variation) => {
    this.setState({ selectedVariation: variation })
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
              <form name="vtex-product-customizer-form">
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
                <IngredientsContent currentVariation={selectedVariation} isOpen={isChangeIngredients} onClose={this.handleCloseChangeIngredients} />
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

export default ProductCustomizer
