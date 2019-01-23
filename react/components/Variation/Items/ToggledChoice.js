import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'vtex.styleguide'

import '../../../global.css'

class ToggledChoice extends Component {
  static propTypes = {
    /* Max limit of selections */
    selected: PropTypes.bool,
    /* Trigger function to handle changes on inputs  */
    onChange: PropTypes.func,
    /* Item to populate component data   */
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }

  render() {
    const { item, selected, onChange, disabled } = this.props
    const isSelected = selected

    return (
      <label className={`vtex-product-customizer__toggled-choice ${isSelected ? 'selected bg-washed-blue' : 'hover-bg-near-white'} db pa4 pointer bb b--light-gray`}>
        <div className="relative flex items-center">
          <div className="flex-none pv2">
            <img src={item.imageUrl} width="48" className="br3" />
          </div>
          <div className="flex-auto ml5">
            <div className="toggled-choice__name t-heading-5">{item.name}</div>
          </div>
          <div className={`${disabled ? 'o-70': ''}`}>
            <Checkbox
              disabled={disabled}
              name={item.name}
              checked={isSelected}
              onChange={onChange}
            />
          </div>
        </div>
      </label>
    )
  }
}

export default ToggledChoice
