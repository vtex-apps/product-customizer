import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SuccessIcon from 'vtex.styleguide/IconSuccess'
import ProductPrice from 'vtex.store-components/ProductPrice'

import './global.css'

class SingleChoice extends Component {
  static propTypes = {
    index: PropTypes.number,
    selected: PropTypes.bool,
    selectItem: PropTypes.func,
    data: PropTypes.object.isRequired,
    handleUpdateAmount: PropTypes.func,
  }

  state = {
    selected: false,
  }

  render() {
    const {
      data,
      index,
      selected,
      selectItem,
      handleUpdateAmount,
    } = this.props

    return (
      <label>
        <div onClick={selectItem} className={`vtex-product-customizer__single-choice ${selected ? 'selected bg-washed-blue' : ''} flex items-center pa5 pointer`}>
          <div className={'single-choice__image-container mr4'}>
            <input
              type="radio"
              className={'dn'}
              name={`input-single-choice__${index}`}
              value={data.price}
              onChange={() => handleUpdateAmount(data)}
            />
            <img className={`single-choice_image-thumb br3 ${selected ? 'ba b--action-primary' : ''}`} src={data.image} />
            <div className={'single-choice__icon-container dn'}>
              <SuccessIcon size={16} />
            </div>
          </div>
          <div className={'single-choice__content flex flex-column'}>
            <div className={'single-choice__title'}>{data.Name}</div>
            <div className={'single-choice__description pt2 mid-gray fw2'}>Lorem ipsum dolor sit amet, consectetur adipiscing.</div>
          </div>
          <div className={'single-choice__price mh4 w3 near-black tc'}>
            <ProductPrice
              showLabels={false}
              showListPrice={false}
              sellingPrice={data.price}
              listPrice={data.price}
            />
          </div>
        </div>
      </label>
    )
  }
}

export default SingleChoice
