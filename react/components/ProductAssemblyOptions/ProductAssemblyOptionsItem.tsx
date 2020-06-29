import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'
import {
  useProductAssemblyGroupState,
  useProductAssemblyGroupDispatch,
} from '../ProductAssemblyContext/Group'
import { GROUP_TYPES } from '../../modules/assemblyGroupType'

const CSS_HANDLES = ['itemContainer'] as const

/**
 * If the Customize button is rendered inside a Single/Radio selection (min 1, max 1)
 * When clicking in the Customize button it should select the item
 */
const useSelectSingle = () => {
  const assemblyItem = useProductAssemblyItem() as AssemblyItem
  const { type, path } = useProductAssemblyGroupState() as AssemblyOptionGroup
  const dispatch = useProductAssemblyGroupDispatch()

  if (
    assemblyItem &&
    assemblyItem.quantity === 0 &&
    type === GROUP_TYPES.SINGLE
  ) {
    return () =>
      dispatch({
        type: 'SET_QUANTITY',
        args: {
          itemId: assemblyItem.id,
          newQuantity: 1,
          type: GROUP_TYPES.SINGLE,
          groupPath: path,
        },
      })
  }
  return undefined
}

const ProductAssemblyOptionsItem: FC = ({ children }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const selectSingle = useSelectSingle()

  const handleClick = () => {
    selectSingle?.()
  }

  const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    const SPACE = ' '
    const ENTER = 'Enter'
    if (key === SPACE || key === ENTER) {
      selectSingle?.()
    }
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${handles.itemContainer} hover-bg-muted-5 bb b--muted-5 pa3`}
    >
      {children}
    </div>
  )
}

export default ProductAssemblyOptionsItem
