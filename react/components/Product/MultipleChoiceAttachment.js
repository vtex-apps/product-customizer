import { Fragment, Component } from 'react'

class MultipleChoiceAttachment extends Component {

  getUpdatedQuantities(updatedItem, delta) {
    const quantities = Object.values(this.props.items).reduce(
      (quantities, item) => ({ ...quantities, [item.name]: { quantity: item.quantity } }),
      {}
    )
    quantities[updatedItem].quantity += delta
    return quantities
  }

  canChangeTotalItems(delta) {
    const { minTotalItems, maxTotalItems, items } = this.props
    const totalItems = Object.values(items).reduce(
      (count, item) => count + item.quantity,
      0
    )
    const newTotalItems = totalItems + delta
    return minTotalItems <= newTotalItems && newTotalItems <= maxTotalItems
  }

  canChangeItemQuantity(itemName, delta) {
    const {minQuantity, quantity, maxQuantity} = this.props.items[itemName]
    const newQuantity = quantity + delta 
    return minQuantity <= newQuantity && newQuantity <= maxQuantity
  }

  handleChangeItemQuantity(itemName, delta) {
    const { name, onAttachmentChange } = this.props
    if (this.canChangeTotalItems(delta) && this.canChangeItemQuantity(itemName, delta)) {
      const quantities = this.getUpdatedQuantities(itemName, delta)
      onAttachmentChange(name, quantities) 
    }
  }

  render() {
    const { name, items } = this.props
    const itemsNames = Object.keys(items)

    return (
      <Fragment>
        <div>{name}:</div>
        {itemsNames.map(itemName =>
          <div key={itemName}>
            <span>- {itemName} </span>
            <span onClick={() => this.handleChangeItemQuantity(itemName, -1)}>(-)</span>
            <span> {items[itemName].quantity} </span>
            <span onClick={() => this.handleChangeItemQuantity(itemName, +1)}>(+)</span>
          </div>
        )}
      </Fragment>
    )
  }
}

export default MultipleChoiceAttachment