import React, { FC } from 'react'
import { useProductAssemblyItem } from '../ProductAssemblyContext'
import { GROUP_TYPES } from '../../utils'

const getItemText = (item: AssemblyItem, groupType: GroupTypes) => {
  const deltaQuantity = item.quantity - item.initialQuantity
  if (deltaQuantity === 0) {
    return null
  }
  if (groupType === GROUP_TYPES.SINGLE) {
    return deltaQuantity > 0 ? item.name : null
  }

  if (groupType === GROUP_TYPES.TOGGLE) {
    return deltaQuantity > 0 ? item.name : `No ${item.name}`
  }

  const sign = deltaQuantity < 0 ? '-' : '+'
  return `${sign}${deltaQuantity}x ${item.name}`
}

const ProductAssemblyOptionItemChildrenDescription: FC = () => {
  const { item } = useProductAssemblyItem()
  if (!item.children) {
    return null
  }
  const groups = Object.values(item.children)
  return (
    <div>
      {groups.map(group => {
        const items = Object.values(group.items).filter(
          ({ quantity, initialQuantity }) => quantity !== initialQuantity
        )
        if (items.length === 0) {
          return null
        }
        return (
          <div className="flex" key={group.id}>
            <div className="mh2">
              {items.map(item => {
                const itemText = getItemText(item, group.type)
                return (
                  itemText && (
                    <div key={itemText} className="c-on-base t-body">
                      {itemText}
                    </div>
                  )
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductAssemblyOptionItemChildrenDescription
