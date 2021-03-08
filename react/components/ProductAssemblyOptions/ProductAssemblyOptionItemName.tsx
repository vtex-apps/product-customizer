import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'
import { withItem } from './withItem'

const CSS_HANDLES = ['productAssemblyOptionItemName'] as const

const ProductAssemblyOptionItemName: FC = () => {
  const { name } = useProductAssemblyItem() as AssemblyItem
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <span
      className={`${handles.productAssemblyOptionItemName} t-heading-5 c-on-base`}
    >
      {name}
    </span>
  )
}

export default withItem(ProductAssemblyOptionItemName)
