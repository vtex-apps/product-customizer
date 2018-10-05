import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import SingleChoiceItem from './Items/SingleChoice'
import MultipleChoiceItem from './Items/MultipleChoice'

class List extends Component {
  static propTypes = {
    index: PropTypes.number,
    total: PropTypes.number,
    intl: intlShape.isRequired,
    variation: PropTypes.object,
    variationGroup: PropTypes.object,
    handleAddSelectedVariations: PropTypes.func,
    handleRemovePreviousSelectedVariation: PropTypes.func,
  }

  state = {
    isValid: false,
  }

  /**
  * handleSelectItem
  * Set the selected item of single choice
  * @param object e
  * @param number key
  * @return void
  */
  handleSelectItem = (e, key) => {
    return this.setState({ selectedSingle: key })
  }

  /**
  * onHandleUpdateAmount
  * Removes the previous value from selected array then add the new one selected
  * @param object selected
  * @return void
  */
  onHandleUpdateAmount = async selected => {
    const {
      handleAddSelectedVariations,
      handleRemovePreviousSelectedVariation,
    } = this.props

    const previousSelected = this.state.currentSelected

    handleRemovePreviousSelectedVariation(previousSelected)

    await this.setState({ currentSelected: selected })

    handleAddSelectedVariations(this.state.currentSelected)
  }

  handleIsValid = () => {
    this.setState({ isValid: true })
  }

  /**
  * renderSingleChoiceVariation
  * displays single choice items
  * @param array options
  * @return <SingleChoiceItem> Array
  */
  renderSingleChoiceVariation = options => {
    return options.items.map((item, key) => {
      return (
        <SingleChoiceItem
          key={key}
          data={item}
          index={this.props.index}
          selected={this.state.selectedSingle === key}
          selectItem={
            async e => {
              await this.handleSelectItem(e, key)
              this.handleIsValid()
            }
          }
          handleUpdateAmount={this.onHandleUpdateAmount}
        />
      )
    })
  }

  /**
  * renderMultipleChoiceVariation
  * displays single choice items
  * @param array options
  * @return <MultipleChoiceItem>Array
  */
  renderMultipleChoiceVariation = options => {
    return options.items.map((item, key) => {
      return (
        <MultipleChoiceItem
          key={key}
          data={item}
        />
      )
    })
  }

  /**
  * renderChoicesTypeVariation
  * Compare types of variations to display a equivalent component.
  * @param object variation
  * @return mixed
  */
  renderChoicesTypeVariation = variation => {
    switch (variation.choiceType) {
      case 'single':
        return this.renderSingleChoiceVariation(variation)
      case 'multiple':
        return this.renderMultipleChoiceVariation(variation)
      default:
        return null
    }
  }

  render() {
    const {
      isValid,
    } = this.state

    const {
      intl,
      variation,
    } = this.props

    const requiredLabel = intl.formatMessage({ id: 'product-customizer.required' })

    return (
      <div>
        <div className={`vtex-product-customizer__skus bg-white ${isValid ? 'valid' : 'invalid'}`}>
          <div className={'flex items-center justify-between bb b--light-gray'}>
            <h4 className={'skus-title bn-ns ma0 pa5 f5 fw5'}>{ variation.description }</h4>
            {variation.required ? <span className={'skus--required-variation pa5 gray'}>
              { requiredLabel }
            </span> : null}
          </div>
          { this.renderChoicesTypeVariation(variation) }
        </div>
      </div>
    )
  }
}

export default injectIntl(List)
