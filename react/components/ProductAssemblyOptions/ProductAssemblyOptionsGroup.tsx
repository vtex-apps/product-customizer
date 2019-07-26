import React, { Fragment, FC } from 'react'

import ProductAssemblyItem from './ProductAssemblyItem'

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

  return (
    <Fragment>
      <div className="ttc-s pv4 c-muted-2 t-small ">
        {assemblyOptionState.groupName}
      </div>
      {Object.values(assemblyOptionState.items).map(item => {
        return (
          <ProductAssemblyItem
            groupType={assemblyOptionState.type}
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
