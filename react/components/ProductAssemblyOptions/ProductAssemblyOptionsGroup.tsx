import React, { Fragment, FC } from 'react'
import { propEq } from 'ramda'

import ProductAssemblyItem from './ProductAssemblyItem'

const maxIsOne = propEq('maxQuantity', 1)

const getGroupType = (assemblyOption: AssemblyOptionGroup) => {
  if (assemblyOption.maxQuantity === 1) {
    return 'SINGLE'
  }

  if (Object.values(assemblyOption.items).every(maxIsOne)) {
    return 'TOGGLE'
  }

  return 'MULTIPLE'
}

const getGroupPath = (assemblyTreePath?: TreePath[]) => {
  let groupPath = [] as string[]
  const treePath = assemblyTreePath || []
  for (const currentPath of treePath) {
    groupPath = groupPath.concat([
      'items',
      currentPath.itemId,
      'children',
      currentPath.groupId,
    ])
  }
  return groupPath
}

interface Props {
  assemblyOptionState: AssemblyOptionGroup
}

const ProductAssemblyOptionsGroup: FC<Props> = ({
  assemblyOptionState,
  children,
}) => {
  const groupPath = getGroupPath(assemblyOptionState.treePath)
  const groupQuantitySum = Object.values(assemblyOptionState.items).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  )
  const groupType = getGroupType(assemblyOptionState)

  return (
    <Fragment>
      <div className="ttc">{assemblyOptionState.groupName}</div>
      {Object.values(assemblyOptionState.items).map(item => {
        return (
          <ProductAssemblyItem
            groupType={groupType}
            groupQuantitySum={groupQuantitySum}
            item={item}
            groupMaxQuantity={assemblyOptionState.maxQuantity}
            groupMinQuantity={assemblyOptionState.minQuantity}
            groupPath={groupPath}
          >
            {children}
          </ProductAssemblyItem>
        )
      })}
    </Fragment>
  )
}

export default ProductAssemblyOptionsGroup
