import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import SingleChoiceItem from './Items/SingleChoice'

class VariationList extends Component {
  static propTypes = {
    index: PropTypes.number,
    skuId: PropTypes.number,
    selected: PropTypes.number,
    intl: intlShape.isRequired,
    onSelectItem: PropTypes.func,
    variations: PropTypes.object,
    onVariationChange: PropTypes.func,
  }

  handleSingleChoiceChange = (variation, quantity) => {
    const {
      skuId,
      onVariationChange,
    } = this.props

    console.log('Handle Single Choice Cahnges', skuId, variation, quantity)
    onVariationChange(variation)
  }

  render() {
    const {
      index,
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
          skuId={this.props.skuId}
          selected={selected === index}
          onSelectItem={onSelectItem}
          onVariationChange={this.handleSingleChoiceChange}
        />
      )
    })
  }
}

export default injectIntl(VariationList)
