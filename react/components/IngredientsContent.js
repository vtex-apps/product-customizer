import PropTypes from 'prop-types'
import React, { Component } from 'react'

import MultipleChoice from './Variation/Items/MultipleChoice'

class IngredientsContent extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onVariationChange: PropTypes.func,
    currentVariation: PropTypes.object,
  }

  state = {
    ingredients: [
      { id: 1, image: 'https://via.placeholder.com/72x72', name: 'Extra Variation 1', price: 3.90 },
      { id: 2, image: 'https://via.placeholder.com/72x72', name: 'Extra Variation 2', price: 3.90 },
      { id: 3, image: 'https://via.placeholder.com/72x72', name: 'Extra Variation 3', price: 3.90 },
      { id: 4, image: 'https://via.placeholder.com/72x72', name: 'Extra Variation 4', price: 4.90 },
      { id: 5, image: 'https://via.placeholder.com/72x72', name: 'Extra Variation 5', price: 2.90 },
    ],
    selectedIngredients: [
      { id: 3, image: 'https://via.placeholder.com/72x72', name: 'Variation 1', price: 20.90 },
      { id: 5, image: 'https://via.placeholder.com/72x72', name: 'Variation 2', price: 21.90 },
    ],
  }

  render() {
    const {
      isOpen,
      onClose,
      currentVariation,
      onVariationChange,
    } = this.props

    return (isOpen
      ? <div className="vtex-product-customizer__change-ingredients">
        <h3>Change ingredients</h3>
        <span onClick={onClose}>x</span>
        <div className="change-ingredients--selected-variation">
          <fieldset>
            <legend>Your item variation</legend>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/72x72" />
              <div className="pa5">
                <h4 className="ma0">{currentVariation.name}</h4>
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
                {this.state.ingredients.map((ingredient, key) => {
                  return (
                    <li key={key} className="flex justify-between items-center mb4">
                      <MultipleChoice onVariationChange={onVariationChange} index={key} item={ingredient} minTotalItems={0} maxTotalItems={10} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
      : null)
  }
}

export default IngredientsContent
