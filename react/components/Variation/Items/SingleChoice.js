import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductPrice from 'vtex.store-components/ProductPrice'
import Radio from 'vtex.styleguide/Radio'
import ItemDescription from './ItemDescription'

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
      item: { imageUrl, name, price },
      selected,
      onChange,
      showPlus,
    } = this.props

    const calculatedPrice = (price / 100).toFixed(2)
    const parsedPrice = parseFloat(calculatedPrice)

    const description = parsedPrice &&
      <div className={'single-choice__price flex t-small fw5 c-action-primary mt1'}>
        {showPlus && <div>+ </div>}
        <ProductPrice {...{ showLabels: false, showListPrice: false, sellingPrice: parsedPrice }} />
      </div>

    return (
      <div onClick={onChange} className={`${selected && 'selected bg-muted-5'} hover-bg-muted-5 ph4 pointer bb b--muted-5 bw1`}>
        <div className="relative flex items-center justify-between pv5">
          <ItemDescription {...{ description, imageUrl, name }} />
          <div className="mt3">
            <Radio
              checked={selected}
              // Required but useless props
              {...{ id: '', label: '', name: '', value: '', onChange: () => {} }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SingleChoice
