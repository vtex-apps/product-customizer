import React, { Component, Fragment } from 'react'
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

    return (
      <label className="flex justify-between items-center pv4 bb b--light-gray pointer">
        <div className="flex items-center">
          <img src={item.image} width="32" className="br3 h-100" />
          <div className="pa5">
            <h4 className="ma0">{item.name}</h4>
          </div>
        </div>
        <Checkbox
          name={index}
          disabled={item.minQuantity === '1' && item.defaultQuantity === '1'}
          checked={!!chosenAmount[index]}
          onChange={this.handleChosenAmount}
        />
      </label>
    )
  }
}

export default ToggledChoice
