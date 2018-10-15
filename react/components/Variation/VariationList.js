import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SingleChoiceItem from './Items/SingleChoice'

class VariationList extends Component {
  static propTypes = {
    /* Index to define the current variation selected */
    index: PropTypes.number,
    /* Define if current component is selected  */
    selected: PropTypes.number,
    /* Trigger function to handle selections  */
    onSelectItem: PropTypes.func,
    /* Variations object to populate the component  */
    variations: PropTypes.object,
    /* Trigger function to handle changes on inputs  */
    onVariationChange: PropTypes.func,
    /* Determines a sku for each variation   */
    skuId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  /**
  * handleSingleChoiceChange
  * Handle variation changes.
  * @param object variation
  * @param integer quantity
  * @return void
  */
  handleSingleChoiceChange = (variation, quantity) => {
    const {
      skuId,
      onVariationChange,
    } = this.props

    onVariationChange({ type: 'single', skuId, variation, quantity })
  }

  render() {
    const {
      index,
      skuId,
      selected,
      variations,
      onSelectItem,
    } = this.props

    return variations.map((item, key) => {
      return (
        <SingleChoiceItem
          key={key}
          item={item}
          index={index}
          skuId={skuId}
          selected={selected === index}
          onSelectItem={onSelectItem}
          onVariationChange={this.handleSingleChoiceChange}
        />
      )
    })
  }
}

export default VariationList
