import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SingleChoiceItem from './Items/SingleChoice'
import MultipleChoiceItem from './Items/MultipleChoice'

class List extends Component {
  state = {
    selectedSingle: null,
  }

  handleSelectItem = (e, key) => {
    this.setState({ selectedSingle: key })
  }

  /**
  * renderSingleChoiceVariation
  * displays single choice items
  * @return <SingleChoiceItem> Array
  */
  renderSingleChoiceVariation = (options) => {
    return options.items.map((item, key) => {
      return (
        <SingleChoiceItem
          key={key}
          data={item}
          selected={this.state.selectedSingle === key}
          onClick={
            e => {
              this.handleSelectItem(e, key)
            }
          }
        />
      )
    })
  }

  /**
  * renderMultipleChoiceVariation
  * displays single choice items
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
    total: PropTypes.number,
    variation: PropTypes.object,
  }
}

export default List
