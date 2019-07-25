import React, { useMemo, FC } from 'react'
import { ProductAssemblyItemContext } from '../ProductAssemblyContext'
import styles from './styles.css'

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
  return (
    <ProductAssemblyItemContext.Provider value={childState}>
      <div
        className={`${styles.itemContainer} hover-bg-muted-5 bb b--muted-5 pa3`}
      >
        {children}
      </div>
    </ProductAssemblyItemContext.Provider>
  )
}

export default ProductAssemblyItem
