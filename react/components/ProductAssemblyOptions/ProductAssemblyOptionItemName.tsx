import React, { FC } from 'react'
import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'
import { withItem } from './withItem'

const ProductAssemblyOptionItemName: FC = () => {
  const { name } = useProductAssemblyItem() as AssemblyItem
  return <span className="t-heading-5 c-on-base">{name}</span>
}

export default withItem(ProductAssemblyOptionItemName)
