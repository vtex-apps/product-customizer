import { Fragment } from 'react'

import AttachmentPicker from './AttachmentPicker';

function AttachmentsPicker({ attachments, onAttachmentChange }) {
  return (
    <Fragment>
      {Object.keys(attachments).map(
        name =>
          <AttachmentPicker
            key={name}
            onAttachmentChange={onAttachmentChange}
            {...attachments[name]} />
      )}
    </Fragment>
  )
}

export default AttachmentsPicker