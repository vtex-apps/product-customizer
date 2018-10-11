import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { injectIntl, intlShape } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

class AddToCart extends Component {
  static propTypes = {
    /* Total of current selected variations */
    total: PropTypes.number,
    /* Internationalizetion object */
    intl: intlShape.isRequired,
    /* Toggle the button state if there's not selected variations */
    isVariationSelected: PropTypes.bool,
  }

  /**
  * render
  * Render the current component.
  * @return <Component> AddToCart
  */
  render() {
    const intl = this.props.intl
    const label = intl.formatMessage({ id: 'product-customizer.add-to-cart' })

    const {
      total,
      isVariationSelected,
    } = this.props

    return (<div className="actions--add-to-cart tc ph5 pb5">
      <Button type="submit" disabled={!isVariationSelected}>
        { label }
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

export default injectIntl(AddToCart)
