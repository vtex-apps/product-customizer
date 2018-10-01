import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'

import './global.css'

class AddToCart extends Component {
  render() {
    return (
      <div className={'vtex-product-customizer__actions tc pa5'}>
        <Button>Add to cart ({this.props.total})</Button>
      </div>
    )
  }

  static propTypes = {
    total: PropTypes.float,
  }
}

export default AddToCart
