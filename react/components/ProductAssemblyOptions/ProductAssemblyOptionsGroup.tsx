import React, { FC, Fragment } from 'react'

import { useProductAssemblyGroupState } from '../ProductAssemblyContext/Group'
import useAssemblyOptionsModifications from '../../modules/useAssemblyOptionsModifications'
import ProductAssemblyOptionItemInputValues from './ProductAssemblyOptionItemInputValues'
import { ProductAssemblyItemProvider } from '../ProductAssemblyContext/Item'
import styles from './styles.css'

const ProductAssemblyOptionsGroup: FC = ({ children }) => {
  const assemblyOptionGroup = useProductAssemblyGroupState() as AssemblyOptionGroupType

  useAssemblyOptionsModifications(assemblyOptionGroup)

  return (
    <Fragment>
      <div className="ttc-s pv4 c-muted-2 t-small">
        {assemblyOptionGroup.groupName}
      </div>
      {assemblyOptionGroup.items
        ? Object.values(assemblyOptionGroup.items).map(item => {
            return (
              <ProductAssemblyItemProvider item={item} key={item.id}>
                <div
                  className={`${styles.itemContainer} hover-bg-muted-5 bb b--muted-5 pa3`}
                >
                  {children}
                </div>
              </ProductAssemblyItemProvider>
            )
          })
        : <ProductAssemblyOptionItemInputValues />
      }
    </Fragment>
  )
}


export default ProductAssemblyOptionsGroup
