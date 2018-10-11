import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { injectIntl, intlShape } from 'react-intl'

class ChangeToppings extends Component {
  static propTypes = {
    /* Handle click events */
    onClick: PropTypes.func,
    /* Internationalizetion object */
    intl: intlShape.isRequired,
    /* Enable toppings changes is true */
    canChangeToppings: PropTypes.bool,
    /* Toggle the button state if there's not selected variations */
    isVariationSelected: PropTypes.bool,
  }

  /**
  * render
  * Render the current component.
  * @return <Component> ChangeToppings
  */
  render() {
    const {
      intl,
      onClick,
      isVariationSelected,
      canChangeToppings,
    } = this.props
    const changeLabel = intl.formatMessage({ id: 'product-customizer.change-composition' })

    return (
      canChangeToppings && isVariationSelected ? <div className="actions--change-toppings ph5 pt5">
        <Button variation="tertiary" onClick={onClick}>{ changeLabel }</Button>
      </div> : null
    )
  }
}

export default injectIntl(ChangeToppings)
