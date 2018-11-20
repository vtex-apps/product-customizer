import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import NumericStepper from 'vtex.styleguide/NumericStepper'
import ProductPrice from 'vtex.store-components/ProductPrice'
import ItemDescription from './ItemDescription';

class MultipleChoice extends Component {
  static propTypes = {
    item: PropTypes.object,
    chosenAmount: PropTypes.number, canIncrease: PropTypes.bool,
    canDecrease: PropTypes.bool,
    onChange: PropTypes.func,
  }

  render() {
    const { item: { image : imageUrl, price, name }, chosenAmount, canIncrease, canDecrease, onChange } = this.props

    const calculatedPrice = (price / 100).toFixed(2)
    const parsedPrice = parseFloat(calculatedPrice)
    const isSelected = !!chosenAmount

    return (
      <div className={`vtex-product-customizer__multiple-choice ${isSelected && 'selected bg-muted-5'} hover-bg-muted-5 w-100 ph4 pv5 bb b--muted-5`}>
        <div className="relative flex items-center flex-wrap">
          <ItemDescription {...{ imageUrl, name }} />
          <div className="flex-auto flex-none-ns flex justify-end">
            <PricePerUnit {...{ isSelected, parsedPrice }} />
            <div className="multiple-choice__actions flex-none ml4">
              <NumericStepper
                lean
                value={chosenAmount}
                minValue={chosenAmount - canDecrease}
                maxValue={chosenAmount + canIncrease}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

function PricePerUnit({ isSelected, parsedPrice }) {
  return (
    <div className={`multiple-choice__price ${isSelected ? '' : 'o-50'} flex-none mr5 tr`}>
      <ProductPrice
        showLabels={false}
        showListPrice={false}
        sellingPrice={parsedPrice}
        listPrice={parsedPrice}
      />
      <span className="f7">
        <FormattedMessage id="product-customizer.per-unit" />
      </span>
    </div>
  )
}

export default MultipleChoice
