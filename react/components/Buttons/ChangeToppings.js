import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { injectIntl, intlShape } from 'react-intl'

class ChangeToppings extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    intl: intlShape.isRequired,
    isVariationSelected: PropTypes.bool,
    enableChangeToppings: PropTypes.bool,
  }

  render() {
    const {
      intl,
      onClick,
      isVariationSelected,
      enableChangeToppings,
    } = this.props
    const changeLabel = intl.formatMessage({ id: 'product-customizer.change-composition' })

    return (
      enableChangeToppings && isVariationSelected ? <div className="actions--change-toppings ph5 pa5">
        <Button
          variation="tertiary"
          onClick={onClick}
        >{ changeLabel }</Button>
      </div> : null
    )
  }
}

export default injectIntl(ChangeToppings)
