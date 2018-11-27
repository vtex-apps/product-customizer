import PropTypes from 'prop-types'
import React, { Component } from 'react'
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

    const description = !!parsedPrice &&
      <div className={"multiple-choice__price flex-none"}>
        <ProductPrice {...{ showLabels: false, showListPrice: false, sellingPrice: parsedPrice }} />
      </div>

    return (
      <div className={`vtex-product-customizer__multiple-choice ${isSelected && 'selected bg-muted-5'} hover-bg-muted-5 w-100 ph4 pv5 bb b--muted-5`}>
        <div className="relative flex items-center">
          <ItemDescription {...{ imageUrl, name, description }} />
          <div className="flex-auto flex-none-ns flex justify-end">
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


export default MultipleChoice
