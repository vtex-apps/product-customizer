import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'
import {
  useProductAssemblyGroupState,
  useProductAssemblyGroupDispatch,
} from '../ProductAssemblyContext/Group'
import { GROUP_TYPES } from '../../modules/assemblyGroupType'

const CSS_HANDLES = ['itemContainer'] as const

const useSelectOption = () => {
  const { id, quantity } = useProductAssemblyItem() as AssemblyItem
  const { type, path } = useProductAssemblyGroupState() as AssemblyOptionGroup
  const dispatch = useProductAssemblyGroupDispatch()

  if (quantity === 0 && type === GROUP_TYPES.SINGLE) {
    return () =>
      dispatch({
        type: 'SET_QUANTITY',
        args: {
          itemId: id,
          newQuantity: 1,
          type: GROUP_TYPES.SINGLE,
          groupPath: path,
        },
      })
  }

  if (type === GROUP_TYPES.TOGGLE) {
    return () =>
      dispatch({
        type: 'SET_QUANTITY',
        args: {
          itemId: id,
          newQuantity: quantity === 1 ? 0 : 1,
          type: GROUP_TYPES.TOGGLE,
          groupPath: path,
        },
      })
  }

  return undefined
}

const ProductAssemblyOptionsItem: FC = ({ children }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const select = useSelectOption()

  const handleClick = () => {
    select?.()
  }

  const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    const SPACE = ' '
    const ENTER = 'Enter'

    if (key === SPACE || key === ENTER) {
      select?.()
    }
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${handles.itemContainer} hover-bg-muted-5 bb b--muted-5 pa3 pointer`}
    >
      {children}
    </div>
  )
}

export default ProductAssemblyOptionsItem
