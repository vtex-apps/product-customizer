import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SingleChoiceItem from './Items/SingleChoice'
import MultipleChoiceItem from './Items/MultipleChoice'

class List extends Component {
  renderMultipleChoiceVariation = (option) => {
    return option.items.map((item, key) => {
      return <MultipleChoiceItem key={key} data={item} />
    })
  }

  renderSingleChoiceVariation = (option) => {
    return option.items.map((item, key) => {
      return <SingleChoiceItem key={key} data={item} />
    })
  }

  render() {
    const {
      options,
    } = this.props

    return (
      <div className={'vtex-product-customizer__options bg-light-gray bg-transparent-ns overflow-auto'}>
        <h4 className={'ma0 pv3 ph5'}><span className={'f5 fw5'}>Select item variation</span></h4>
        {options.map((variation, key) => {
          return (
            <div key={key} >
              <div className={'vtex-product-customizer__skus bg-white'}>
                <h4 className={'sku-title b--light-gray bn-ns bb ma0 pa5 f5 fw5'}>{variation.description}</h4>
                { variation.choiceType === 'multiple' ? this.renderMultipleChoiceVariation(variation) : this.renderSingleChoiceVariation(variation) }
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  static propTypes = {
    options: PropTypes.array,
  }
}

export default List
