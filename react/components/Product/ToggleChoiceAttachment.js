import React, { Component, Fragment } from 'react'

import ToggledChoice from '../Variation/Items/ToggledChoice';

class ToggleChoiceAttachment extends Component {

  onChange = (itemName, item) => {
    const { name, onAttachmentChange } = this.props
    const { id, quantity, seller } = item
    onAttachmentChange(name, { [itemName]: { id, quantity: Number(!quantity), seller } })
  }
  render() {
    const { items } = this.props

    return (
      <Fragment>
        {Object.entries(items).map(([itemName, item]) =>
          <ToggledChoice 
            item={item} 
            selected={item.quantity === 1}
            disabled={item.minQuantity === 1}
            onChange={() => this.onChange(itemName, item)} 
            key={itemName} />
        )}
      </Fragment>
    )
  }
}

export default ToggleChoiceAttachment