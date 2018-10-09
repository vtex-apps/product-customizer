import PropTypes from 'prop-types'
import React, { Component } from 'react'

class IngredientsContent extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    currentVariation: PropTypes.object,
  }

  state = {
    ingredients: [
      { id: 1, image: 'https://via.placeholder.com/72x72', name: 'Variation 1', price: 19.90 },
      { id: 2, image: 'https://via.placeholder.com/72x72', name: 'Variation 2', price: 19.90 },
      { id: 3, image: 'https://via.placeholder.com/72x72', name: 'Variation 3', price: 19.90 },
      { id: 4, image: 'https://via.placeholder.com/72x72', name: 'Variation 4', price: 19.90 },
      { id: 5, image: 'https://via.placeholder.com/72x72', name: 'Variation 5', price: 19.90 },
    ],
    selectedIngredients: [
      { id: 1, image: 'https://via.placeholder.com/72x72', name: 'Variation 7', price: 20.90 },
      { id: 1, image: 'https://via.placeholder.com/72x72', name: 'Variation 8', price: 21.90 },
    ],
  }

  render() {
    const {
      isOpen,
      onClose,
      currentVariation,
    } = this.props

    return (isOpen
      ? <div className="vtex-product-customizer__change-ingredients">
        <h3>Change ingredients</h3>
        <span onClick={onClose}>x</span>
        <div className="change-ingredients--selected-variation">
          <fieldset>
            <legend>Your item variation</legend>
            <img src="https://via.placeholder.com/72x72" />
            <h4>{currentVariation.name}</h4>
          </fieldset>

          <fieldset>
            <legend>Select your ingredients</legend>
            <div className="change-ingredients--selected-ingredients">
              <h5>Your ingredients</h5>
              <ul className="pa0">
                {this.state.selectedIngredients.map((ingredient, key) => {
                  return (
                    <li key={key} className="flex justify-between">
                      <img src={ingredient.image} />
                      <h4>{ingredient.name}</h4>
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
                    <li key={key} className="flex justify-between">
                      <img src="https://via.placeholder.com/72x72" />
                      <div className="flex align-center">
                        <h4>{ingredient.name}</h4>
                        <div>{ingredient.price}</div>
                      </div>
                      <span>- +</span>
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
