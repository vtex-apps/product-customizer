import React, { FC } from 'react'
import ProductPrice from 'vtex.store-components/ProductPrice'

import { useProductAssemblyItem } from '../ProductAssemblyContext'

const sumAssembliesPrice = (
  assemblyOptions: Record<string, AssemblyOptionGroup>
): number => {
  const assembliesGroupItems = Object.values(assemblyOptions)
  return assembliesGroupItems.reduce((sum, group) => {
    const groupPrice = Object.values(group.items).reduce((groupSum, item) => {
      const childrenPrice = item.children
        ? sumAssembliesPrice(item.children)
        : 0
      return groupSum + (item.price + childrenPrice) * item.quantity
    }, 0)
    return groupPrice + sum
  }, 0)
}

const Price: FC = () => {
  const { item } = useProductAssemblyItem()

  if ((item.price == null || item.price === 0) && !item.children) {
    return null
  }
  const childrenCost = item.children ? sumAssembliesPrice(item.children) : 0
  const totalPrice = (item.price + childrenCost) / 100

  return (
    <div className="flex items-center t-body b c-on-base">
      <span>+ </span>
      <ProductPrice
        showLabels={false}
        showListPrice={false}
        sellingPrice={totalPrice}
      />
    </div>
  )
}

export default Price
