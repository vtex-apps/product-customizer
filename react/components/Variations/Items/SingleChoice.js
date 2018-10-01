import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SingleChoice extends Component {
  render() {
    const {
      data,
    } = this.props

    return (
      <div className={'vtex-product-customizer__single-choice flex items-center pa5 pointer'}>
        <img className={'single-choice_image-thumb br3 mr4'} width="52" src={data.image} />
        <div className={'single-choice__content flex flex-column'}>
          <div className={'single-choice__title'}>{data.Name}</div>
          <div className={'single-choice__description pt2 mid-gray fw2'}>Our iconic crust, filled with delicious mozzarella</div>
        </div>
        <div className={'single-choice__price mh4 w3 near-black tc'}>{data.price}</div>
      </div>
    )
  }

  static propTypes = {
    data: PropTypes.object,
  }
}

export default SingleChoice
