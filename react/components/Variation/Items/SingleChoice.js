import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SuccessIcon from 'vtex.styleguide/IconSuccess'
import ProductPrice from 'vtex.store-components/ProductPrice'

class SingleChoice extends Component {
  static propTypes = {
    index: PropTypes.number,
    selected: PropTypes.bool,
    selectItem: PropTypes.func,
    item: PropTypes.object.isRequired,
    handleUpdateAmount: PropTypes.func,
  }

  state = {
    selected: false,
  }

  render() {
    const {
      item,
      index,
      selected,
      selectItem,
      handleUpdateAmount,
    } = this.props

    return (
      <label>
        <div onClick={selectItem} className={`vtex-product-customizer__single-choice ${selected ? 'selected bg-washed-blue' : ''} flex items-center pa5 pointer`}>
          <div className="single-choice__image-container mr4">
            <input
              type="radio"
              className="dn"
              name={`input-single-choice__${index}`}
              value={item.price}
              onChange={() => handleUpdateAmount(item)}
            />
            <img className={`single-choice_image-thumb br3 ${selected ? 'ba b--action-primary' : ''}`} src={item.image} />
            <div className="single-choice__icon-container dn">
              <SuccessIcon size={16} />
            </div>
          </div>
          <div className="single-choice__content flex flex-column">
            <div className="single-choice__title">{item.Name}</div>
            <div className="single-choice__description pt2 mid-gray fw2">{item.Description}</div>
          </div>
          <div className="single-choice__price mh4 w3 near-black tc">
            <ProductPrice
              showLabels={false}
              showListPrice={false}
              sellingPrice={item.price}
              listPrice={item.price}
            />
          </div>
        </div>
      </label>
    )
  }
}

export default SingleChoice
