import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import SingleChoiceAttachment from './SingleChoiceAttachment'
import MultipleChoiceAttachment from './MultipleChoiceAttachment'
import ToggleChoiceAttachment from './ToggleChoiceAttachment'

function getTitleId({ name }) {
  const key = name.toLowerCase().split(' ').join('-')

  return `store/product-customizer.${key}-title`
}

function AttachmentPicker({
  name,
  items,
  properties: { minTotalItems, maxTotalItems },
  onAttachmentChange,
  isToggleChoice,
  isSingleChoice,
}) {
  if (isSingleChoice) {
    return (
      <SingleChoiceAttachment
        name={name}
        items={items}
        onAttachmentChange={onAttachmentChange}
      />
    )
  }

  if (isToggleChoice) {
    return (
      <ToggleChoiceAttachment
        name={name}
        items={items}
        onAttachmentChange={onAttachmentChange}
      />
    )
  }

  return (
    <MultipleChoiceAttachment
      {...{ name, items, onAttachmentChange, minTotalItems, maxTotalItems }}
    />
  )
}

function AttachmentPickerWithTitle(props) {
  return (
    <Fragment>
      <div className="ph5 pv4 c-muted-2 t-small">
        <FormattedMessage id={getTitleId(props)} />
      </div>
      <AttachmentPicker {...props} />
    </Fragment>
  )
}

export default AttachmentPickerWithTitle
