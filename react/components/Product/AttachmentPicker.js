import React from 'react'
import SingleChoiceAttachment from './SingleChoiceAttachment'
import MultipleChoiceAttachment from './MultipleChoiceAttachment'

function AttachmentPicker({
  name,
  items,
  properties: {
    minTotalItems,
    maxTotalItems,
  },
  onAttachmentChange,
}) {
  if (minTotalItems === 1 && maxTotalItems === 1) {
    return <SingleChoiceAttachment name={name} items={items} onAttachmentChange={onAttachmentChange} />
  }
  return <MultipleChoiceAttachment {...{ name, items, onAttachmentChange, minTotalItems, maxTotalItems }} />
}

export default AttachmentPicker
