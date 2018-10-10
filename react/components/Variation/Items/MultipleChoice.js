import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NumericStepper from 'vtex.styleguide/NumericStepper'
import ProductPrice from 'vtex.store-components/ProductPrice'

class MultipleChoice extends Component {
  static propTypes = {
    index: PropTypes.number,
    minTotalItems: PropTypes.number,
    maxTotalItems: PropTypes.number,
    onVariationChange: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }

  state = {
    choosedAmount: 0,
  }

  handleChoosedAmount = async e => {
    e.preventDefault()

    const choosedAmount = e.value
    const {
      item,
      index,
      onVariationChange,
    } = this.props

    await this.setState({ choosedAmount })

    onVariationChange({ index, variation: item, quantity: choosedAmount })
  }

  render() {
    const {
      item,
    } = this.props

    return (
      <div className="vtex-product-customizer__multiple-choice w-100 flex justify-between items-center pointer">
        <div className="flex align-center">
          <img src={item.image} />
          <div className="multiple-choice__title w-100 flex flex-column justify-center pa5">
            <div className="multiple-choice__name">{item.name}</div>
            <div className="multiple-choice__price">
              <ProductPrice
                showLabels={false}
                showListPrice={false}
                sellingPrice={item.price}
                listPrice={item.price}
              />
            </div>
          </div>
        </div>
        <div className="multiple-choice__actions near-black tc">
          <NumericStepper
            value={this.state.choosedAmount}
            minItems={item.minItems}
            maxValue={item.maxItems}
            onChange={this.handleChoosedAmount}
          />
        </div>
      </div>
    )
  }
}

export default MultipleChoice
