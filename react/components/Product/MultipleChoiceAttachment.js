import { Fragment, Component } from 'react'
import MultipleChoice from '../Variation/Items/MultipleChoice';

class MultipleChoiceAttachment extends Component {

  getUpdatedQuantities(updatedItem, quantity) {
    const quantities = Object.values(this.props.items).reduce(
      (quantities, item) => ({ ...quantities, [item.name]: { id: item.id, quantity: item.quantity, seller: item.seller }}),
      {}
    )
    quantities[updatedItem].quantity = quantity
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

  canChangeItemQuantity(itemName, newQuantity) {
    const { minQuantity, quantity, maxQuantity } = this.props.items[itemName]
    return minQuantity <= newQuantity
      && newQuantity <= maxQuantity
      && this.canChangeTotalItems(newQuantity - quantity)
  }

  handleChangeItemQuantity(itemName, quantity) {
    console.log('chagning', itemName, quantity)
    const { name, onAttachmentChange } = this.props
    if (this.canChangeItemQuantity(itemName, quantity)) {
      const quantities = this.getUpdatedQuantities(itemName, quantity)
      onAttachmentChange(name, quantities)
    }
  }

  getItemProps(itemName) {
    const { items } = this.props
    const item = items[itemName]
    return {
      item,
      chosenAmount: item.quantity,
      canIncrease: this.canChangeItemQuantity(itemName, item.quantity + 1),
      canDecrease: this.canChangeItemQuantity(itemName, item.quantity - 1),
      onChange: ({ value }) => this.handleChangeItemQuantity(itemName, value),
    }
  }

  render() {
    const { items } = this.props
    const itemsNames = Object.keys(items)

    return (
      <Fragment>
        {itemsNames.map(itemName => <MultipleChoice {...this.getItemProps(itemName)} key={itemName} />)}
      </Fragment>
    )
  }
}

export default MultipleChoiceAttachment