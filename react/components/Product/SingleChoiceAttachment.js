import { Fragment } from 'react'

import SingleChoice from '../Variation/Items/SingleChoice';

function SingleChoiceAttachment({ name, items, onAttachmentChange }) {
  const onChange = (itemName) => 
    () => onAttachmentChange(name, { [itemName]: 1 })
  return (
    <Fragment>
      <div>{name}:</div>
      {Object.entries(items).map(([itemName, item]) =>
        <SingleChoice item={item} selected={item.quantity === 1} onChange={onChange(itemName)} key={itemName} />
      )}
    </Fragment>
  )
}

export default SingleChoiceAttachment