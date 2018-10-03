import React, { Component } from 'react'
import Modal from 'vtex.styleguide/Modal'
import Button from 'vtex.styleguide/Button'

import './global.css'
import schema from './__mock__/index.json'
import AddToCart from './components/Buttons/AddToCart'
import VariationList from './components/Variation/List'
import ChangeToppings from './components/Buttons/ChangeToppings'
import ProductCustomizerService from './utils/ProductCustomizerService'

const isMobile = window.__RUNTIME__.hints.mobile

class ProductCustomizer extends Component {
  service = new ProductCustomizerService(schema)
  state = {
    total: 0.00,
    isModalOpen: false,
    changeToppings: false,
    selectedVariations: [],
    variations: this.service.serializeData(),
  }

  calculateTotal = () => {
    let currentTotal = 0
    const {
      selectedVariations,
    } = this.state

    if (selectedVariations.length === 0) {
      return 0
    }

    for (const selectedVariation of selectedVariations) {
      currentTotal += selectedVariation.price
    }

    this.setState({ total: currentTotal })
  }

  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const {
      variations,
    } = this.state

    return (
      <div>
        <Button onClick={this.handleOpenModal}>Customize your product</Button>

        <Modal
          centered
          isOpen={this.state.isModalOpen}
          onClose={this.handleCloseModal}
        >
          <div className={'flex-ns h-100-ns'}>
            <h1 className={`vtex-product-customizer__title tc f4 fw5 ma0 pa5 w-100 bg-black-40 white ${!isMobile ? 'dn' : ''}`}>Create Your Own</h1>
            <div className={'w-100 w-third-ns flex-ns tc items-center-ns pa5 h-100-ns'}>
              <img
                className={'vtex-product-customizer__image br3'}
                alt="Product Customize Image"
                src="https://via.placeholder.com/330x330"
              />
            </div>
            <div className={'w-100 w-two-thirds-ns flex-ns flex-column-ns'}>
              <h1 className={`vtex-product-customizer__title fw5 ma0 f3 pa5 ${isMobile ? 'dn' : ''}`}>Create Your Own</h1>
              <div className={'pb5-ns pt0-ns ph5-ns  ph5 pb5 bb b--light-gray'}>
                <p className={'ma0 fw3'}>Todo el sabor mexicano. Chorizo, pico de gallo, jalapeño y tocino.</p>
              </div>
              <div className={'vtex-product-customizer__options bg-light-gray bg-transparent-ns overflow-auto'}>
                <h4 className={'ma0 pv3 ph5'}>
                  <span className={'f5 fw5'}>Select item variation</span>
                </h4>
                {variations.map((variation, key) => {
                  return (
                    <VariationList
                      key={key}
                      variation={variation}
                    />
                  )
                })}
              </div>

              <div className={'vtex-product-customizer__actions bt b--light-gray'}>
                <ChangeToppings />
                <AddToCart total={this.state.total} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ProductCustomizer
