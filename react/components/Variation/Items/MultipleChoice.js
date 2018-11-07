import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NumericStepper from 'vtex.styleguide/NumericStepper'
import ProductPrice from 'vtex.store-components/ProductPrice'

class MultipleChoice extends Component {
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

  handleChosenAmount = async e => {
    e.preventDefault()

    const chosenAmount = e.value
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

    const calculatedPrice = (item.price / 100).toFixed(2)
    const parsedPrice = parseFloat(calculatedPrice)
    const selected = !!chosenAmount[index]

    return (
      <div className={`vtex-product-customizer__multiple-choice ${selected ? 'selected bg-washed-blue' : ''} w-100 ph4 pv5`}>
        <div className="relative flex items-center flex-wrap">
          <div className="flex-auto flex align-center">
            <div>
              <img src={item.image} width="48" className="br3" />
            </div>
            <div className="multiple-choice__title flex flex-column justify-center ml5">
              <div className="multiple-choice__name">{item.name}</div>
            </div>
          </div>
          <div className="flex-auto flex-none-ns flex justify-end">
            <div className={`multiple-choice__price ${selected ? '' : 'o-50'} flex-none mr5 tr`}>
              <ProductPrice
                showLabels={false}
                showListPrice={false}
                sellingPrice={parsedPrice}
                listPrice={parsedPrice}
              />
              <span className="f7"><FormattedMessage id="product-customizer.per-unit" /></span>
            </div>
            <div className="multiple-choice__actions flex-none ml4">
              <NumericStepper
                lean
                value={chosenAmount[index]}
                minItems={parseInt(item.minQuantity)}
                maxValue={parseInt(item.maxQuantity)}
                onChange={this.handleChosenAmount}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MultipleChoice
