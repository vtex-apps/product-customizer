import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SuccessIcon from 'vtex.styleguide/IconSuccess'
import ProductPrice from 'vtex.store-components/ProductPrice'

class SingleChoice extends Component {
  static propTypes = {
    index: PropTypes.number,
    selected: PropTypes.bool,
    item: PropTypes.object.isRequired,
    onVariationChange: PropTypes.func,
  }

  state = {
    selected: false,
  }

  handleVariationChange = () => {
    const {
      item,
      onVariationChange,
    } = this.props

    onVariationChange(item, 1)
  }

  render() {
    const {
      item,
      index,
      selected,
    } = this.props

    return (
      <label>
        <div className={`vtex-product-customizer__single-choice ${selected ? 'selected bg-washed-blue' : ''} flex items-center pa5 pointer`}>
          <div className="single-choice__image-container mr4">
            <input
              type="radio"
              className="dn"
              name={`input-single-choice__${index}`}
              value={item.id}
              onChange={this.handleVariationChange}
            />
            <img className={`single-choice_image-thumb br3 ${selected ? 'ba b--action-primary' : ''}`} src="https://via.placeholder.com/40x40" />
            <div className="single-choice__icon-container dn">
              <SuccessIcon size={16} />
            </div>
          </div>
          <div className="single-choice__content flex flex-column">
            <div className="single-choice__title">Variation</div>
            <div className="single-choice__description pt2 mid-gray fw2">Description</div>
          </div>
          <div className="single-choice__price mh4 w3 near-black tc">
            <ProductPrice
              showLabels={false}
              showListPrice={false}
              sellingPrice={19.90}
              listPrice={19.90}
            />
          </div>
        </div>
      </label>
    )
  }
}

export default SingleChoice
