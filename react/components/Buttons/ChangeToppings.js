import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { injectIntl, intlShape } from 'react-intl'

class ChangeToppings extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    enableChangeToppings: PropTypes.bool,
  }

  render() {
    const {
      intl,
      enableChangeToppings,
    } = this.props
    const changeLabel = intl.formatMessage({ id: 'product-customizer.change-composition' })

    return (
      <div className={`actions--change-toppings ph5 pa5 ${!enableChangeToppings ? 'dn' : ''}`}>
        <Button
          variation="tertiary"
        >{ changeLabel }</Button>
      </div>
    )
  }
}

export default injectIntl(ChangeToppings)
