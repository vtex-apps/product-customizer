import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductPrice from 'vtex.store-components/ProductPrice'

class SingleChoice extends Component {
  static propTypes = {
    /* Index to define the current variation selected */
    index: PropTypes.number,
    /* Define if current component is selected  */
    selected: PropTypes.bool,
    /* Trigger function to handle selections  */
    onSelectItem: PropTypes.func,
    /* Trigger function to handle changes on inputs  */
    onVariationChange: PropTypes.func,
    /* Item object to populate the component  */
    item: PropTypes.object.isRequired,
    /* ID of the SKU */
    skuId: PropTypes.string,
  }

  /**
  * handleVariationChange
  * Handle variation changes.
  * @return void
  */
  handleVariationChange = () => {
    const {
      item,
      skuId,
      onSelectItem,
      onVariationChange,
    } = this.props

    onSelectItem({ parent: skuId, child: item.id })
    onVariationChange(item, 1)

    this.setState({ selected: true })
  }

  render() {
    const {
      item,
      selected,
    } = this.props

    const calculatedPrice = (item.price / 100).toFixed(2)
    const parsedPrice = parseFloat(calculatedPrice)

    return (
      <label className={`vtex-product-customizer__single-choice ${selected ? 'selected bg-washed-blue' : ''} db pa4 pointer`}>
        <div className="relative flex items-center justify-between">
          <div className="flex">
            <div className="single-choice__image-container mr4">
              <input
                type="radio"
                className="dn"
                name="input-single-choice"
                value={item.id}
                onChange={this.handleVariationChange}
              />
              <img className="single-choice_image-thumb br3" src={item.image} />
            </div>
            <div className="single-choice__content flex flex-column justify-center">
              <div className="single-choice__title">{item.name}</div>
              <div className="single-choice__description pt2 mid-gray fw2">{item.description || null}</div>
            </div>
          </div>
          <div className="single-choice__price mh4 w3 near-black tc">
            <ProductPrice
              showLabels={false}
              showListPrice={false}
              sellingPrice={parsedPrice}
              listPrice={parsedPrice}
            />
          </div>
          {
            selected && (
              <div className="single-choice__icon-container absolute right-0 top-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path fill="#70a401" d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M7,11.4L3.6,8L5,6.6l2,2l4-4L12.4,6L7,11.4z" />
                </svg>
              </div>
            )
          }
        </div>
      </label>
    )
  }
}

export default SingleChoice
