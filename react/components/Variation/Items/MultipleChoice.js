import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NumericStepper from 'vtex.styleguide/NumericStepper'

class MultipleChoice extends Component {
  state = {
    choosedAmount: 0,
  }
  render() {
    const {
      data,
    } = this.props

    return (
      <div className={'vtex-product-customizer__multiple-choice flex items-center pa5 pointer'}>
        <div className={'multiple-choice__title w-100'}>{data}</div>
        <div className={'multiple-choice__actions mh4 near-black tc'}>
          <NumericStepper
            value={this.state.choosedAmount}
            onChange={event => this.setState({ choosedAmount: event.value })}
          />
        </div>
      </div>
    )
  }

  static propTypes = {
    data: PropTypes.string,
  }
}

export default MultipleChoice
