import React, { Fragment } from 'react'

import ToggledChoice from '../Variation/Items/ToggledChoice';

function onChange(name, itemName, id, quantity, onAttachmentChange) {
  return onAttachmentChange(name, { [itemName]: { id, quantity: Number(!quantity) }}) 
}

function ToggleChoiceAttachment({ name, items, onAttachmentChange }) {
  return (
    <Fragment>
      {Object.entries(items).map(([itemName, item]) =>
        <ToggledChoice 
          item={item} 
          selected={item.quantity === 1}
          disabled={item.minQuantity === 1}
          onChange={() => onChange(name, itemName, item.id, item.quantity, onAttachmentChange)} 
          key={itemName} />
      )}
    </Fragment>
  )
}

export default ToggleChoiceAttachment