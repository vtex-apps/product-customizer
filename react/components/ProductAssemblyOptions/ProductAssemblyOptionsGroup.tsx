import React, { FC, Fragment } from 'react'

import { useProductAssemblyGroupState, useProductAssemblyGroupDispatch } from '../ProductAssemblyContext/Group'
import useAssemblyOptionsModifications from '../../modules/useAssemblyOptionsModifications'
import { ProductAssemblyItemProvider } from '../ProductAssemblyContext/Item'
import { Button } from 'vtex.styleguide'
import styles from './styles.css'

const ProductAssemblyOptionsGroup: FC = ({ children }) => {
  const assemblyOptionGroup = useProductAssemblyGroupState() as AssemblyOptionGroupState
  const dispatch = useProductAssemblyGroupDispatch()

  useAssemblyOptionsModifications(assemblyOptionGroup)

  const changeOptinInput = () => {
    dispatch({
      type: 'OPTIN',
      args: {
        groupPath: assemblyOptionGroup.path,
      }
    })
  }

  return (
    <Fragment>
      {assemblyOptionGroup.optin === false
        ? (
          <Button
            variation="secondary"
            onClick={changeOptinInput}>
            Add {assemblyOptionGroup.id}
          </Button>
        )
        : (
          <Fragment>
            <div className="flex justify-between">
              <div className="ttc-s pv4 c-muted-2 t-small">
                {assemblyOptionGroup.groupName}
              </div>
              {assemblyOptionGroup.required === false &&
                <div>
                  <Button
                    size="small"
                    collapseRight
                    variation="tertiary"
                    onClick={changeOptinInput}>
                    Remove
                  </Button>
                </div>
              }
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
              : (
                <ProductAssemblyItemProvider item={null}>
                  {children}
                </ProductAssemblyItemProvider>
              )
            }
          </Fragment>
        )
      }
    </Fragment>
  )
}


export default ProductAssemblyOptionsGroup
