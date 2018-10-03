import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SuccessIcon from 'vtex.styleguide/IconSuccess'
import ProductPrice from 'vtex.store-components/ProductPrice'

import './global.css'

class SingleChoice extends Component {
  state = {
    selected: false,
  }

  render() {
    const {
      data,
      onClick,
      selected,
    } = this.props

    return (
      <div onClick={onClick} className={`vtex-product-customizer__single-choice ${selected ? 'selected bg-washed-blue' : ''} flex items-center pa5 pointer`}>
        <div className={'single-choice__image-container mr4'}>
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
    )
  }

  static propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.function,
  }
}

export default SingleChoice
