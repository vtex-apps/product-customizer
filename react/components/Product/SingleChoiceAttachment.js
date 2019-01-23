import { Fragment } from 'react'

import SingleChoice from '../Variation/Items/SingleChoice';

function SingleChoiceAttachment({ name, items, onAttachmentChange }) {
  const onChange = (itemName, item) => 
    () => onAttachmentChange(name, { [itemName]: { id: item.id, quantity: 1, seller: item.seller }}, true)
  return (
    <Fragment>
      {Object.entries(items).map(([itemName, item]) =>
        <SingleChoice 
          item={item}
          selected={item.quantity === 1}
          onChange={onChange(itemName, item)}
          key={itemName}
          showPlus
        />
      )}
    </Fragment>
  )
}

export default SingleChoiceAttachment