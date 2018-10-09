import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import SingleChoiceItem from './Items/SingleChoice'

class VariationList extends Component {
  static propTypes = {
    skuId: PropTypes.number,
    intl: intlShape.isRequired,
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
      variations,
    } = this.props

    return variations.map((item, key) => {
      return (
        <SingleChoiceItem
          key={key}
          item={item}
          skuId={this.props.skuId}
          onVariationChange={this.handleSingleChoiceChange}
        />
      )
    })
  }
}

export default injectIntl(VariationList)
