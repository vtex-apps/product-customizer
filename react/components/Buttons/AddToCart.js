import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { FormattedMessage } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

class AddToCart extends Component {
  static propTypes = {
    /* Total of current selected variations */
    total: PropTypes.number,
    /* Toggle the button state if there's not selected variations */
    isVariationSelected: PropTypes.bool,
  }

  /**
  * render
  * Render the current component.
  * @return <Component> AddToCart
  */
  render() {
    const {
      total,
      isVariationSelected,
    } = this.props

    return (<div className="actions--add-to-cart tc ph5 pb5">
      <Button type="submit" disabled={!isVariationSelected}>
        <FormattedMessage id="product-customizer.add-to-cart" />
        <ProductPrice
          showLabels={false}
          showListPrice={false}
          sellingPrice={total}
          listPrice={total}
        />
      </Button>
    </div>)
  }
}

export default AddToCart
