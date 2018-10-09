import PropTypes from 'prop-types'
import React, { Component } from 'react'

import VariationList from './Variation/VariationList'

class SkuGroupList extends Component {
  static propTypes = {
    skus: PropTypes.array,
    onVariationChange: PropTypes.func,
  }

  render() {
    const {
      onVariationChange,
    } = this.props

    return (
      this.props.skus.map((sku, key) => {
        return (
          <div key={key}>
            <div className="vtex-product-customizer__skus bg-white">
              <div className={'flex items-center justify-between bb b--light-gray'}>
                <h4 className={'skus-title bn-ns ma0 pa5 f5 fw5'}>{ sku.name }</h4>
              </div>
              <VariationList key={key} skuId={sku.itemId} variations={sku.attachments} onVariationChange={onVariationChange} />
            </div>
          </div>
        )
      })
    )
  }
}

export default SkuGroupList
