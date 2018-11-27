import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'vtex.styleguide'

class ToggledChoice extends Component {
  static propTypes = {
    /* Index to define the chossed amount */
    index: PropTypes.string,
    /* Object that handle the chosen amount of variations */
    chosenAmount: PropTypes.object,
    /* Min limit of selections */
    minTotalItems: PropTypes.string,
    /* Max limit of selections */
    maxTotalItems: PropTypes.string,
    /* Trigger function to handle changes on inputs  */
    onVariationChange: PropTypes.func,
    /* Item to populate component data   */
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }

  handleChosenAmount = e => {
    const chosenAmount = e.target.checked | 0
    const {
      item,
      index,
      minTotalItems,
      maxTotalItems,
      onVariationChange,
    } = this.props

    this.setState({ chosenAmount }, () =>
      onVariationChange({
        index,
        minTotalItems,
        maxTotalItems,
        variation: item,
        quantity: chosenAmount,
      })
    )
  }

  render() {
    const { item, index, chosenAmount } = this.props
    const isDisabled = item.minQuantity === '1' && item.defaultQuantity === '1'
    const isSelected = !!chosenAmount[index] || isDisabled

    return (
      <label className={`vtex-product-customizer__toggled-choice ${isSelected ? 'selected bg-washed-blue' : 'hover-bg-near-white'} db pa4 pointer bb b--light-gray`}>
        <div className="relative flex items-center">
          <div className="flex-none pv2">
            <img src={item.image} width="48" className="br3" />
          </div>
          <div className="flex-auto ml5">
            <div className="toggled-choice__name t-heading-5">{item.name}</div>
          </div>
          <div className={`single-choice__icon-container ${isDisabled ? 'o-30' : ''} flex-none ml3`}>
            {
              isSelected
                ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" className="db">
                    <path fill="#70a401" d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M7,11.4L3.6,8L5,6.6l2,2l4-4L12.4,6L7,11.4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" className="db">
                    <path fill="#70a401" d="M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z M8,14c-3.309,0-6-2.691-6-6s2.691-6,6-6 s6,2.691,6,6S11.309,14,8,14z" />
                  </svg>
                )
            }
          </div>
          <div className="dn">
            <Checkbox
              name={index}
              disabled={isDisabled}
              checked={!!chosenAmount[index]}
              onChange={this.handleChosenAmount}
            />
          </div>
        </div>
      </label>
    )
  }
}

export default ToggledChoice
