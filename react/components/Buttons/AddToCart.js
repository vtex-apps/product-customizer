import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { injectIntl, intlShape } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

class AddToCart extends Component {
  static propTypes = {
    total: PropTypes.number,
    intl: intlShape.isRequired,
  }

  render() {
    const intl = this.props.intl
    const label = intl.formatMessage({ id: 'product-customizer.add-to-cart' })

    return (
      <div className="actions--add-to-cart tc ph5 pb5">
        <Button type="submit">
          { label }
          <ProductPrice
            showLabels={false}
            showListPrice={false}
            sellingPrice={this.props.total}
            listPrice={this.props.total}
          />
        </Button>
      </div>
    )
  }
}

export default injectIntl(AddToCart)
