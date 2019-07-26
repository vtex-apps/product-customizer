import React, { FC } from 'react'
import { useProductAssemblyItem } from '../ProductAssemblyContext'

const Name: FC = () => {
  const { item } = useProductAssemblyItem()
  return <span className="t-heading-5 c-on-base">{item.name}</span>
}

export default Name
