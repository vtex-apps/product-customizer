import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SingleChoiceItem from './Items/SingleChoice'
import MultipleChoiceItem from './Items/MultipleChoice'

class Group extends Component {
  state = {
    selectedSingle: undefined,
    multipleChoiveItemsSelecteds: [],
  }

  handleSelectItem = (e, key) => {
    this.setState({ selectedSingle: key })
  }

  renderSingleChoiceVariation = (options) => {
    return options.items.map((item, key) => {
      return (
        <SingleChoiceItem
          key={key}
          data={item}
          selected={this.state.selectedSingle === key}
          onClick={e => this.handleSelectItem(e, key)}
        />
      )
    })
  }

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
    variation: PropTypes.object,
  }
}

export default Group
