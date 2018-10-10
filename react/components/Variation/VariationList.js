import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import SingleChoiceItem from './Items/SingleChoice'

class VariationList extends Component {
  static propTypes = {
    index: PropTypes.number,
    selected: PropTypes.number,
    intl: intlShape.isRequired,
    onSelectItem: PropTypes.func,
    variations: PropTypes.object,
    onVariationChange: PropTypes.func,
    skuId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

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

export default injectIntl(VariationList)
