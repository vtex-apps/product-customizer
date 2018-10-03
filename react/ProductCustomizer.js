import React, { Component } from 'react'
import Modal from 'vtex.styleguide/Modal'
import Button from 'vtex.styleguide/Button'

import './global.css'
import data from './__mock__/index.json'
import List from './components/Variations/List'
import AddToCart from './components/Buttons/AddToCart'
import ProductCustomizerService from './utils/ProductCustomizerService'

const isMobile = window.__RUNTIME__.hints.mobile

class ProductCustomizer extends Component {
  Service = new ProductCustomizerService(data)
  state = {
    total: 0.00,
    isModalOpen: false,
    variations: this.Service.serializeData(),
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
                alt="Create Your Own"
                src="https://via.placeholder.com/330x330"
              />
            </div>
            <div className={'w-100 w-two-thirds-ns flex-ns flex-column-ns'}>
              <h1 className={`vtex-product-customizer__title fw5 ma0 f3 pa5 ${isMobile ? 'dn' : ''}`}>Create Your Own</h1>
              <div className={'pb5-ns pt0-ns ph5-ns  ph5 pb5 bb b--light-gray'}>
                <p className={'ma0 fw3'}>Todo el sabor mexicano. Chorizo, pico de gallo, jalapeño y tocino.</p>
              </div>
              <List options={variations} />
              <AddToCart total={this.state.total} />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ProductCustomizer
