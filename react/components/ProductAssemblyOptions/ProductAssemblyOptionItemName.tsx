import React, { FC } from 'react'
import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'

const ProductAssemblyOptionItemName: FC = () => {
  const { name } = useProductAssemblyItem()
  return <span className="t-heading-5 c-on-base">{name}</span>
}

export default ProductAssemblyOptionItemName
