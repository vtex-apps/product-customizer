import React, { Fragment } from 'react'

import AttachmentPicker from './AttachmentPicker'

function precedence({ properties: { minTotalItems, maxTotalItems } }) {
  if (minTotalItems === 1 && maxTotalItems === 1) { return 0 }
  return maxTotalItems
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
