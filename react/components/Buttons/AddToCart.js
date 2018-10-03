import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import ProductPrice from 'vtex.store-components/ProductPrice'

import './global.css'

class AddToCart extends Component {
  render() {
    return (
      <div className={'actions--add-to-cart tc ph5 pb5'}>
        <Button>
          Add to cart
          <ProductPrice showLabels={false} showListPrice={false} sellingPrice={this.props.total} listPrice={this.props.total} />
        </Button>
      </div>
    )
  }

  static propTypes = {
    total: PropTypes.number,
  }
}

export default AddToCart
