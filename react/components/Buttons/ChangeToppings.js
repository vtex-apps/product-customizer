import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'

class ChangeToppings extends Component {
  render() {
    return (
      <div className={'actions--change-toppings ph5 pa5'}>
        <Button
          variation="tertiary"
        >Change ingredients or sauce</Button>
      </div>
    )
  }
}

export default ChangeToppings
