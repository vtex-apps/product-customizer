import { Fragment } from 'react'

import AttachmentPicker from './AttachmentPicker';

function precedence({properties: {type, required}}) {
  if (required && type === 'string') {
    return 2
  }
  else if (required && type !== 'string') {
    return 1
  } else if (!required) {
    return 0
  }
}

function compareAttachments([_, att1], [__, att2]) {
  return precedence(att2) - precedence(att1) 
}

function AttachmentsPicker({ attachments, onAttachmentChange }) {
  return (
    <Fragment>
      {Object.entries(attachments)
        .sort(compareAttachments)
        .map(
          ([name, attachment]) =>
            <AttachmentPicker
              key={name}
              onAttachmentChange={onAttachmentChange}
              {...attachment} />
        )}
    </Fragment>
  )
}

export default AttachmentsPicker