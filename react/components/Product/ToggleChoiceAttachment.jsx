import React, { Component, Fragment } from 'react'

import ToggledChoice from '../Variation/Items/ToggledChoice'

const parseItem = ({ id, quantity, seller, name }) => ({
  [name]: { id, quantity: Number(!quantity), seller },
})

class ToggleChoiceAttachment extends Component {
  handleChange = (itemName) => {
    const { items, name, onAttachmentChange } = this.props
    onAttachmentChange(name, parseItem(items[itemName]), false)
  }

  render() {
    const { items } = this.props

    return (
      <Fragment>
        {Object.entries(items).map(([itemName, item]) => (
          <ToggledChoice
            imageUrl={item.imageUrl}
            name={item.name}
            selected={item.quantity === 1}
            disabled={item.minQuantity === 1}
            onChange={this.handleChange}
            key={itemName}
          />
        ))}
      </Fragment>
    )
  }
}

export default ToggleChoiceAttachment
