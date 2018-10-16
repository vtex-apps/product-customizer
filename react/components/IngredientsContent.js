import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import MultipleChoice from './Variation/Items/MultipleChoice'

class IngredientsContent extends Component {
  static propTypes = {
    /* Control the open state */
    isOpen: PropTypes.bool,
    /* Trigger function to close component */
    onClose: PropTypes.func,
    /* Object with indexes and ammount of selected optional variations */
    chosenAmount: PropTypes.object,
    /* Triggers function to execute on change variations */
    onVariationChange: PropTypes.func,
    /* Current required variation selected */
    currentVariation: PropTypes.object,
    /* Current optionals variations selected */
    optionalVariations: PropTypes.object,
    /* Composition of Product */
    compositionVariations: PropTypes.object,
  }

  render() {
    const {
      chosenAmount,
      currentVariation,
      onVariationChange,
      optionalVariations,
      compositionVariations,
    } = this.props

    return (
      currentVariation && (
        <div className="vtex-product-customizer__change-ingredients pb10">
          <h3 className="b--light-gray bb bw1 pa5 ma0 b near-black">
            <FormattedMessage id="product-customizer.change-ingredients" />
          </h3>
          <div className="change-ingredients--selected-variation">
            <legend className="bg-near-white w-100 ph5 pv4">
              <FormattedMessage id="product-customizer.your-variation" />
            </legend>
            <div className="flex items-center pa5">
              <img src={currentVariation.variation.image} width="48" className="br3 h-100" />
              <div className="pa5">
                <h4 className="ma0">{currentVariation.variation.name}</h4>
              </div>
            </div>

            <legend className="bg-near-white w-100 ph5 pv4 mb4">
              <FormattedMessage id="product-customizer.select-your-ingredients" />
            </legend>
            <div className="change-ingredients--selected-ingredients ph5 mb5">
              <p className="pv3 bb b--light-gray ttu ma0 f7 b near-black">
                <FormattedMessage id="product-customizer.selected-ingredients" />
              </p>
              <ul className="ma0 pa0">
                {compositionVariations.variations.map((ingredient, key) => {
                  return (
                    <li
                      key={key}
                      className="flex justify-between items-center pv4 bb b--light-gray"
                    >
                      <div className="flex">
                        <img src={ingredient.image} width="48" className="br3 h-100" />
                        <div className="pa5">
                          <h4 className="ma0">{ingredient.name}</h4>
                        </div>
                      </div>
                      {
                        ingredient.minQuantity === '1' && ingredient.defaultQuantity === '1'
                          ? null
                          : <span>x</span>
                      }
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="change-ingredients--extra-ingredients ph5 mb5">
              <p className="pv3 bb b--light-gray ttu ma0 f7 b near-black">
                <FormattedMessage id="product-customizer.extra-ingredients" />
              </p>
              <ul className="ma0 pa0">
                {optionalVariations.variations.map((ingredient, key) => {
                  return (
                    <li
                      key={key}
                      className={`flex justify-between items-center pv4 ${
                        key !== optionalVariations.variations.length - 1 ? 'bb b--light-gray' : ''
                      }`}
                    >
                      <MultipleChoice
                        item={ingredient}
                        minTotalItems={optionalVariations.minTotalItems}
                        maxTotalItems={optionalVariations.maxTotalItems}
                        index={ingredient.name}
                        chosenAmount={chosenAmount}
                        onVariationChange={onVariationChange}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default IngredientsContent
