import React, { FC } from 'react'

import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'
import { GROUP_TYPES } from '../../modules/assemblyGroupType'
import { withItem } from './withItem'

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
  const { children } = useProductAssemblyItem() as AssemblyItem

  if (!children) {
    return null
  }

  const groups = Object.values(children)
  return (
    <div>
      {groups.map((group) => {
        const assemblyGroup = group as AssemblyOptionGroup

        const items = Object.values(assemblyGroup.items || []).filter(
          ({ quantity, initialQuantity }) => quantity !== initialQuantity
        )

        if (items.length === 0) {
          return null
        }

        return (
          <div className="flex" key={assemblyGroup.id}>
            <div className="mh2">
              {items.map((item) => {
                const itemText = getItemText(item, assemblyGroup.type)
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

export default withItem(ProductAssemblyOptionItemChildrenDescription)
