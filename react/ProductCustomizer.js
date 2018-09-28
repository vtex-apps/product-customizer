import React, { Component } from 'react'
import Modal from 'vtex.styleguide/Modal'
import Button from 'vtex.styleguide/Button'

import './global.css'
import AttachmentsList from './components/AttachmentsList'

const isMobile = window.__RUNTIME__.hints.mobile

class ProductCustomizer extends Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpenModal}>Customize your product</Button>

        <Modal
          top
          isMobile="true"
          isOpen={this.state.isModalOpen}
          onClose={this.handleCloseModal}
        >
          <div className={'flex-ns h-100-ns'}>
            <div className={'w-100 w-third-ns bg-light-gray bb b--light-gray flex-ns items-center-ns  h-100-ns'}>
              <h1 className={`vtex-product-customizer__title tc f4 fw5 absolute ma0 pa5 w-100 bg-black-40 white ${!isMobile ? 'dn' : ''}`}>Create Your Own</h1>
              <img
                className={'vtex-product-customizer__image'}
                alt="Create Your Own"
                src="https://api.pizzahut.io/v1/content/images/pizza/cyo.aaf361bc6ca3110a2b05a149b72ddefd.1.png?width=800"
              />
            </div>
            <div className={'w-100 w-two-thirds-ns flex-ns flex-column-ns'}>
              <h1 className={`vtex-product-customizer__title fw5 ma0 f3 pa5 ${isMobile ? 'dn' : ''}`}>Create Your Own</h1>
              <div className={'pb5-ns pt0-ns ph5-ns pa5 bb b--light-gray'}>
                <p className={'ma0 fw3'}>Go freestyle! Simply choose your sauce and add any toppings.</p>
              </div>
              <AttachmentsList />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ProductCustomizer
