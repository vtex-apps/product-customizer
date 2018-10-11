import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SuccessIcon from 'vtex.styleguide/IconSuccess'
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
  }

  /**
  * handleVariationChange
  * Handle variation changes.
  * @return void
  */
  handleVariationChange = () => {
    const {
      item,
      index,
      onSelectItem,
      onVariationChange,
    } = this.props

    onSelectItem(index)
    onVariationChange(item, 1)

    this.setState({ selected: true })
  }

  /**
  * render
  * Render the current component.
  * @return <Component> SingleChoice
  */
  render() {
    const {
      item,
      selected,
    } = this.props

    const parsedPrice = parseFloat(item.price / 100).toFixed(2)

    return (
      <label>
        <div className={`vtex-product-customizer__single-choice ${selected ? 'selected bg-washed-blue' : ''} flex items-center justify-between pa5 pointer`}>
          <div className="flex">
            <div className="single-choice__image-container mr4">
              <input
                type="radio"
                className="dn"
                name="input-single-choice"
                value={item.id}
                onChange={this.handleVariationChange}
              />
              <img className={`single-choice_image-thumb br3 ${selected ? 'ba b--action-primary' : ''}`} src={item.image} />
              <div className="single-choice__icon-container dn">
                <SuccessIcon size={16} />
              </div>
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
        </div>
      </label>
    )
  }
}

export default SingleChoice
