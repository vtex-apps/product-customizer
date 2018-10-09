import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NumericStepper from 'vtex.styleguide/NumericStepper'
import ProductPrice from 'vtex.store-components/ProductPrice'

class MultipleChoice extends Component {
  static propTypes = {
    withPrice: PropTypes.bool,
    minTotalItems: PropTypes.number,
    maxTotalItems: PropTypes.number,
    onVariationChange: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }

  state = {
    total: 0,
    choosedAmount: 0,
  }

  calculateAmountOfSelectedItems = (quantity, item) => {
    const total = (quantity * item.price).toFixed(2)

    this.handleTotal(total)
  }

  handleTotal = (total) => {
    this.setState({ total: total })
  }

  handleChoosedAmount = (choosedAmount) => {
    this.setState({ choosedAmount })
  }

  render() {
    const {
      item,
      withPrice,
      onVariationChange,
    } = this.props

    return (
      <div className="vtex-product-customizer__multiple-choice flex items-center pa5 pointer">
        <div className={`multiple-choice__title w-100 ${withPrice ? 'flex flex-column justify-center' : ''}`}>
          <div className="multiple-choice__name">{withPrice ? item.Name : item }</div>
          <div className="multiple-choice__price">
            {withPrice ? <ProductPrice
              showLabels={false}
              showListPrice={false}
              sellingPrice={item.price}
              listPrice={item.price}
            /> : null}
          </div>
        </div>
        <div className="multiple-choice__actions mh4 near-black tc">
          <NumericStepper
            value={this.state.choosedAmount}
            minItems={item.minItems}
            maxValue={item.maxItems}
            onChange={event => { onVariationChange(item, event.value) }}
          />
        </div>
      </div>
    )
  }
}

export default MultipleChoice
