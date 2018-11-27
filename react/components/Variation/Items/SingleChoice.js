import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductPrice from 'vtex.store-components/ProductPrice'
import Radio from 'vtex.styleguide/Radio'
import ItemDescription from './ItemDescription';

class SingleChoice extends Component {
  static propTypes = {
    /* Define if current component is selected  */
    selected: PropTypes.bool,
    /* Trigger function to handle changes on inputs  */
    onChange: PropTypes.func,
    /* Item object to populate the component  */
    item: PropTypes.object.isRequired,
  }

  render() {
    const {
      item: { image: imageUrl, name, price },
      selected,
      onChange
    } = this.props

    const calculatedPrice = (price / 100).toFixed(2)
    const parsedPrice = parseFloat(calculatedPrice)

    const description = parsedPrice &&
      <div className={"single-choice__price flex-none"}>
        <ProductPrice {...{ showLabels: false, showListPrice: false, sellingPrice: parsedPrice }} />
      </div>

    return (
      <div onClick={onChange} className={`${selected && 'selected bg-muted-5'} hover-bg-muted-5 db pa4 pointer bb b--muted-5`}>
        <div className="relative flex items-center justify-between">
          <ItemDescription {...{ description, imageUrl, name }} />
          <Radio
            checked={selected}
            // Required but useless props
            {...{ id: "", label: "", name: "", value: "", onChange: () => {}}}
          />
        </div>
      </div>
    )
  }
}

export default SingleChoice
