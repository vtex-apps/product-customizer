import PropTypes from 'prop-types'
import React, { Component } from 'react'

import VariationList from './Variation/VariationList'

class SkuGroupList extends Component {
  static propTypes = {
    skuId: PropTypes.number,
    skus: PropTypes.array,
    onVariationChange: PropTypes.func,
  }

  state = {
    selected: undefined,
  }

  handleSelectItem = key => {
    this.setState({ selected: key })
  }

  render() {
    const {
      skus,
      skuId,
      onVariationChange,
    } = this.props

    const {
      selected,
    } = this.state

    return (
      skus.map((sku, key) => {
        const variations = JSON.parse(sku.calculatedAttachments)

        return (
          <div key={key}>
            <div className="vtex-product-customizer__skus bg-white">
              <div className={'flex items-center justify-between bb b--light-gray'}>
                <h4 className={'skus-title bn-ns ma0 pa5 f5 fw5'}>{ sku.name }</h4>
              </div>
              <VariationList
                key={key}
                index={key}
                skuId={skuId}
                selected={selected}
                variations={variations}
                onSelectItem={this.handleSelectItem}
                onVariationChange={onVariationChange}
              />
            </div>
          </div>
        )
      })
    )
  }
}

export default SkuGroupList
