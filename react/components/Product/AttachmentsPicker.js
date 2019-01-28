import React, { Component, Fragment } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

import AttachmentPicker from './AttachmentPicker'
import { scrollToElementTop } from '../../utils/scroll'

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

function findFirstNonSingleChoice(attachments) {
  return Object.entries(attachments)
         .sort(compareAttachments)
         .find(([_, { isSingleChoice }]) => !isSingleChoice)
}

class AttachmentsPicker extends Component {
  pickers = Object.keys(this.props.attachments)
            .reduce((prev, name) => ({ ...prev, [name]: React.createRef() }), {})

  state = {
    allSinglesPicked: areAllSinglesPicked(this.props.attachments, this.props.chosenAttachments),
  }

  componentDidMount() {
    smoothscroll.polyfill()
  }

  componentDidUpdate(prevProps) {
    const { attachments, chosenAttachments } = this.props
    if (this.props.selectedSku !== prevProps.selectedSku) {
      this.setState({ allSinglesPicked: areAllSinglesPicked(attachments, chosenAttachments) })
    }
  }

  attachmentChangeCallback = newChosenAttachments => {
    const { attachments } = this.props
    const currentAllSinglesPicked = this.state.allSinglesPicked
    const newSinglesPicked = areAllSinglesPicked(attachments, newChosenAttachments)
    if (currentAllSinglesPicked !== newSinglesPicked) {
      this.setState({ allSinglesPicked: newSinglesPicked })
      const [firstNotSingleName] = findFirstNonSingleChoice(attachments)
      const picker = this.pickers[firstNotSingleName]
      scrollToElementTop(picker.current)
    }
  }

  handleOnAttachmentChange = (attachmentName, quantities, isSingleChoice) => {
    this.props.onAttachmentChange(attachmentName, quantities, isSingleChoice, this.attachmentChangeCallback)
  }

  render() {
    const { attachments } = this.props
    const { allSinglesPicked } = this.state
    return (
      <Fragment>
        {Object.entries(attachments)
          .sort(compareAttachments)
          .map(
            ([name, attachment]) =>
              <div 
                ref={this.pickers[name]} 
                key={name} 
                className={`${shouldShowAttachment(attachment, allSinglesPicked) ? '' : 'dn'}`}
              >
                <AttachmentPicker
                  key={name}
                  onAttachmentChange={this.handleOnAttachmentChange}
                  {...attachment} />
              </div>
          )}
      </Fragment>
    )
  }
}

export default AttachmentsPicker
