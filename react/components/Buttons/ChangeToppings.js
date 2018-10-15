import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { FormattedMessage } from 'react-intl'

class ChangeToppings extends Component {
  static propTypes = {
    /* Handle click events */
    onClick: PropTypes.func,
    /* Enable toppings changes is true */
    canChangeToppings: PropTypes.bool,
    /* Toggle the button state if there's not selected variations */
    isVariationSelected: PropTypes.bool,
  }

  render() {
    const {
      onClick,
      isVariationSelected,
      canChangeToppings,
    } = this.props

    return (
      canChangeToppings && isVariationSelected ? <div className="actions--change-toppings ph5 pt5">
        <Button variation="tertiary" onClick={onClick}>
          <FormattedMessage id="product-customizer.change-composition" />
        </Button>
      </div> : null
    )
  }
}

export default ChangeToppings
