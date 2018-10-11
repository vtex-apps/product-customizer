import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { injectIntl, intlShape } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

class AddToCart extends Component {
  static propTypes = {
    total: PropTypes.number,
    intl: intlShape.isRequired,
    isVariationSelected: PropTypes.bool,
    isModalOpen: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  render() {
    const intl = this.props.intl
    const label = intl.formatMessage({ id: 'product-customizer.add-to-cart' })

    const {
      isVariationSelected,
      isModalOpen,
      onSubmit,
    } = this.props

    return (
      <div className={`actions--add-to-cart tc pa5 ${isModalOpen ? 'fixed w-100 bg-white z-999 bottom-0' : ''}`}>
        <Button type="submit" disabled={!isVariationSelected} onClick={onSubmit} block>
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
