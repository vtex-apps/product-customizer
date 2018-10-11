import PropTypes from 'prop-types'
import React, { Component } from 'react'

import MultipleChoice from './Variation/Items/MultipleChoice'

class IngredientsContent extends Component {
  static propTypes = {
    /* Control the open state */
    isOpen: PropTypes.bool,
    /* Trigger function to close component */
    onClose: PropTypes.func,
    /* Object with indexes and ammount of selected optional variations */
    choosedAmount: PropTypes.object,
    /* Triggers function to execute on change variations */
    onVariationChange: PropTypes.func,
    /* Current required variation selected */
    currentVariation: PropTypes.object,
    /* Current optionals variations selected */
    optionalVariations: PropTypes.object,
  }

  state = {
    selectedIngredients: [
      { id: 3, image: 'https://via.placeholder.com/72x72', name: 'Variation 1', price: 20.90 },
      { id: 5, image: 'https://via.placeholder.com/72x72', name: 'Variation 2', price: 21.90 },
    ],
  }

  /**
  * render
  * Render the current component.
  * @return <Component> IngredientsContent
  */
  render() {
    const {
      choosedAmount,
      currentVariation,
      onVariationChange,
      optionalVariations,
    } = this.props

    return currentVariation && (
      <div className="vtex-product-customizer__change-ingredients">
        <h3>Change ingredients</h3>
        <div className="change-ingredients--selected-variation">
          <fieldset>
            <legend>Your item variation</legend>
            <div className="flex items-center">
              <img src={currentVariation.variation.image} width="72" height="100%" />
              <div className="pa5">
                <h4 className="ma0">{currentVariation.variation.name}</h4>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Select your ingredients</legend>
            <div className="change-ingredients--selected-ingredients">
              <h5>Your ingredients</h5>
              <ul className="pa0">
                {this.state.selectedIngredients.map((ingredient, key) => {
                  return (
                    <li key={key} className="flex justify-between items-center mb4">
                      <div className="flex">
                        <img src={ingredient.image} />
                        <div className="pa5">
                          <h4 className="ma0">{ingredient.name}</h4>
                        </div>
                      </div>
                      <span>x</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="change-ingredients--extra-ingredients">
              <h5>Extra ingredients</h5>
              <ul className="pa0">
                {optionalVariations.variations.map((ingredient, key) => {
                  return (
                    <li key={key} className="flex justify-between items-center mb4">
                      <MultipleChoice
                        item={ingredient}
                        minTotalItems={0}
                        maxTotalItems={10}
                        index={ingredient.name}
                        choosedAmount={choosedAmount}
                        onVariationChange={onVariationChange}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default IngredientsContent
