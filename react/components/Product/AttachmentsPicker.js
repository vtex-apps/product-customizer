import React, { Fragment } from 'react'

import AttachmentPicker from './AttachmentPicker'

function precedence({ isSingleChoice, isToggleChoice }) {
  if (isSingleChoice) { return 0 }
  if (isToggleChoice) { return 1 }
  return 2
}

function compareAttachments([_, att1], [__, att2]) {
  return precedence(att1) - precedence(att2)
}

function AttachmentsPicker({ attachments, onAttachmentChange }) {
  return (
    <Fragment>
      {Object.entries(attachments)
        .sort(compareAttachments)
        .map(
          ([name, attachment]) =>
            (<AttachmentPicker
              key={name}
              onAttachmentChange={onAttachmentChange}
              {...attachment} />)
        )}
    </Fragment>
  )
}

export default AttachmentsPicker
