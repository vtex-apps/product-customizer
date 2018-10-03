import PropTypes from 'prop-types'
import React, { Component } from 'react'

import VariationGroup from './Group'

class List extends Component {
  render() {
    const {
      options,
    } = this.props

    return (
      <div className={'vtex-product-customizer__options bg-light-gray bg-transparent-ns overflow-auto'}>
        <h4 className={'ma0 pv3 ph5'}><span className={'f5 fw5'}>Select item variation</span></h4>
        {options.map((variation, key) => {
          return (
            <VariationGroup key={key} variation={variation} />
          )
        })}
      </div>
    )
  }

  static propTypes = {
    options: PropTypes.array,
  }
}

export default List
