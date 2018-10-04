import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SingleChoiceItem from './Items/SingleChoice'
import MultipleChoiceItem from './Items/MultipleChoice'

class List extends Component {
  state = {
    validated: false,
    selectedSingle: null,
    currentSelected: null,
  }

  /**
  * handleSelectItem
  * Set the selected item of single choice
  * @param object e
  * @param number key
  * @return void
  */
  handleSelectItem = (e, key) => {
    this.setState({ selectedSingle: key })
  }

  /**
  * onHandleUpdateAmount
  * Remove the previous value from selected array then add the new one selected
  * @param object selected
  * @return void
  */
  onHandleUpdateAmount = async (selected) => {
    const {
      handleAddSelectedVariations,
      handleRemovePreviousSelectedVariation,
    } = this.props

    const previousSelected = this.state.currentSelected

    handleRemovePreviousSelectedVariation(previousSelected)

    await this.setState({ currentSelected: selected })

    handleAddSelectedVariations(this.state.currentSelected)
  }

  onHandleValidateList = () => {
    const {
      selectedSingle,
    } = this.state

    if (selectedSingle) {
      console.log('validated')
    }
  }

  /**
  * renderSingleChoiceVariation
  * displays single choice items
  * @param array options
  * @return <SingleChoiceItem> Array
  */
  renderSingleChoiceVariation = (options) => {
    return options.items.map((item, key) => {
      return (
        <SingleChoiceItem
          key={key}
          index={this.props.index}
          data={item}
          selected={this.state.selectedSingle === key}
          selectItem={
            e => {
              this.handleSelectItem(e, key)
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
  renderMultipleChoiceVariation = (options) => {
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
  renderChoicesTypeVariation = (variation) => {
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
      variation,
    } = this.props

    return (
      <div>
        <div className={'vtex-product-customizer__skus bg-white'}>
          <h4 className={'sku-title b--light-gray bn-ns bb ma0 pa5 f5 fw5'}>{ variation.description }</h4>
          { this.renderChoicesTypeVariation(variation) }
        </div>
      </div>
    )
  }

  static propTypes = {
    index: PropTypes.number,
    total: PropTypes.number,
    variation: PropTypes.object,
    handleAddSelectedVariations: PropTypes.func,
    handleRemovePreviousSelectedVariation: PropTypes.func,
  }
}

export default List
