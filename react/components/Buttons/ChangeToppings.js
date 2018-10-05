import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { injectIntl, intlShape } from 'react-intl'

class ChangeToppings extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  render() {
    const changeLabel = this.props.intl.formatMessage({ id: 'product-customizer.change-composition' })
    return (
      <div className={'actions--change-toppings ph5 pa5'}>
        <Button
          variation="tertiary"
        >{ changeLabel }</Button>
      </div>
    )
  }
}

export default injectIntl(ChangeToppings)
