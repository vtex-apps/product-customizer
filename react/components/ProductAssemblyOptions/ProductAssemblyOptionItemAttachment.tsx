import React, { FC } from 'react'
import { useProductAssemblyGroupState, GroupState } from '../ProductAssemblyContext/Group'

const ProductAssemblyOptionItemAttachment: FC = () => {
  const context = useProductAssemblyGroupState() as GroupState

  return <span>{JSON.stringify(context, null, 2)}</span>
}

export default ProductAssemblyOptionItemAttachment