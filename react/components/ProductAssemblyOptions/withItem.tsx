import React, { FC, ComponentType } from 'react'
import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'

export function withItem(WrappedComponent: ComponentType) {
  const WithItem: FC = (props) => {
    const item = useProductAssemblyItem()

    if (!item) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithItem
}