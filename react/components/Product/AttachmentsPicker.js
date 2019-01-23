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

function isSingleChoicePicked(chosenAttachment) {
  return Object.values(chosenAttachment).some(({ quantity }) => quantity > 0)
}

function areAllSinglesPicked(attachments, chosenAttachments) {
  return Object.values(attachments)
         .filter(({ isSingleChoice }) => isSingleChoice)
         .every(({ name }) => isSingleChoicePicked(chosenAttachments[name]))
}

function shouldShowAttachment(attachment, canShowOtherAttachments) {
  if (attachment.isSingleChoice) return true
  return canShowOtherAttachments
}

function AttachmentsPicker({ attachments, onAttachmentChange, chosenAttachments }) {
  const canShowOthers = areAllSinglesPicked(attachments, chosenAttachments)

  return (
    <Fragment>
      {Object.entries(attachments)
        .sort(compareAttachments)
        .map(
          ([name, attachment]) =>
            shouldShowAttachment(attachment, canShowOthers) && (
              <AttachmentPicker
              key={name}
              onAttachmentChange={onAttachmentChange}
              {...attachment} />
            )
        )}
    </Fragment>
  )
}

export default AttachmentsPicker
