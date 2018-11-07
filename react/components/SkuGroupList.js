import PropTypes from 'prop-types'
import React, { Component } from 'react'

import VariationList from './Variation/VariationList'

class SkuGroupList extends Component {
  static propTypes = {
    /* List of skus to interact with attachments */
    skus: PropTypes.array.isRequired,
    /* Function handler to change states by variation selection */
    onVariationChange: PropTypes.func.isRequired,
  }

  state = { selected: { parent: undefined, child: undefined } }

  /**
   * handleSelectItem
   * Handle selected state to change the style of component.
   * @return void
   */
  handleSelectItem = (selected) => this.setState({ selected })

  render() {
    const { skus, onVariationChange } = this.props

    const { selected } = this.state

    return skus.map((sku, key) => (
      <div key={key}>
        <div className="vtex-product-customizer__skus bg-white">
          <div className="flex items-center justify-between bb b--light-gray">
            <h4 className="skus-title bn-ns ma0 pa5 f5 fw5">{sku.name}</h4>
          </div>
          <VariationList
            key={key}
            index={key}
            skuId={sku.itemId}
            selected={selected}
            variations={sku.variations}
            onSelectItem={this.handleSelectItem}
            onVariationChange={onVariationChange}
          />
        </div>
      </div>
    ))
  }
}

export default SkuGroupList
