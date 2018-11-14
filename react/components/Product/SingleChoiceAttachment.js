import { Fragment } from 'react'

function SingleChoiceAttachment({ name, items, onAttachmentChange }) {
  return (
    <Fragment>
      <div>{name}:</div>
      {Object.keys(items).map(itemName =>
        <div onClick={() => onAttachmentChange(name, { [itemName]: { quantity: 1 } })} key={itemName}>
          - {itemName}
        </div>
      )}
    </Fragment>
  )
}

export default SingleChoiceAttachment