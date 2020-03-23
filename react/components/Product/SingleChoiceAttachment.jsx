import React, { Fragment, Component } from 'react'

import SingleChoice from '../Variation/Items/SingleChoice'

const parseItem = ({ id, seller, name }) => ({
  [name]: { id, seller, quantity: 1 },
})

class SingleChoiceAttachment extends Component {
  handleOnChange = itemName => {
    const { name, onAttachmentChange, items } = this.props
    onAttachmentChange(name, parseItem(items[itemName]), true)
  }

  render() {
    const { items } = this.props
    return (
      <Fragment>
        {Object.entries(items).map(([itemName, item]) => (
          <SingleChoice
            price={item.price}
            imageUrl={item.imageUrl}
            name={item.name}
            selected={item.quantity === 1}
            onChange={this.handleOnChange}
            key={itemName}
            showPlus
          />
        ))}
      </Fragment>
    )
  }
}

export default SingleChoiceAttachment
