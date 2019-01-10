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

  renderSvg = () => {
    const { selected } = this.props
    const path = selected ? 
      'M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M7,11.4L3.6,8L5,6.6l2,2l4-4L12.4,6L7,11.4z' :
      'M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z M8,14c-3.309,0-6-2.691-6-6s2.691-6,6-6 s6,2.691,6,6S11.309,14,8,14z'
    
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" className="db">
          <path fill="#134CD8" d={path} />
        </svg>
      )
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
          <div className={`single-choice__icon-container ${disabled ? 'o-30' : ''} flex-none ml3`}>
            {this.renderSvg()}
          </div>
          <div className="dn">
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
