import SingleChoiceAttachment from './SingleChoiceAttachment';
import MultipleChoiceAttachment from './MultipleChoiceAttachment';

function AttachmentPicker({
  name,
  items,
  properties: {
    type,
    minTotalItems,
    maxTotalItems,
    required
  },
  onAttachmentChange
}) {
  if (required && type === 'string') {
    return <SingleChoiceAttachment name={name} items={items} onAttachmentChange={onAttachmentChange} />
  } else {
    return <MultipleChoiceAttachment {...{ name, items, onAttachmentChange, minTotalItems, maxTotalItems }} />
  }
}

export default AttachmentPicker