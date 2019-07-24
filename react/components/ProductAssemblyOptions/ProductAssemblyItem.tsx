import React, { useMemo, FC } from 'react'
import { ProductAssemblyItemContext } from '../ProductAssemblyContext'

interface Props {
  groupType: string
  groupQuantitySum: number
  item: AssemblyItem
  groupMaxQuantity: number
  groupMinQuantity: number
  groupPath: string[]
}

const ProductAssemblyItem: FC<Props> = ({
  children,
  groupType,
  groupQuantitySum,
  item,
  groupMaxQuantity,
  groupMinQuantity,
  groupPath,
}) => {
  const childState = useMemo(
    () => ({
      groupMaxQuantity,
      groupMinQuantity,
      item,
      groupType,
      groupQuantitySum,
      groupPath,
    }),
    [
      groupMaxQuantity,
      groupMinQuantity,
      item,
      groupType,
      groupQuantitySum,
      groupPath,
    ]
  )
  const hasQuantity = item.quantity > 0
  return (
    <ProductAssemblyItemContext.Provider value={childState}>
      <div
        className={`hover-bg-muted-5 bb b--muted-5 ${
          hasQuantity ? 'bg-muted-5' : ''
        }`}
      >
        {children}
      </div>
    </ProductAssemblyItemContext.Provider>
  )
}

export default ProductAssemblyItem
