import { Fragment } from 'react'

import SingleChoice from '../Variation/Items/SingleChoice';

function SingleChoiceAttachment({ name, items, onAttachmentChange }) {
  const onChange = (itemName, id) => 
    () => onAttachmentChange(name, { [itemName]: { id, quantity: 1 }})
  return (
    <Fragment>
      <div>{name}:</div>
      {Object.entries(items).map(([itemName, item]) =>
        <SingleChoice item={item} selected={item.quantity === 1} onChange={onChange(itemName, item.id)} key={itemName} />
      )}
    </Fragment>
  )
}

export default SingleChoiceAttachment