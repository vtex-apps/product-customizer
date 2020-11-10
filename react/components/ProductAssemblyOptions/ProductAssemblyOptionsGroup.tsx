import React, { FC, Fragment } from 'react'
import { Button } from 'vtex.styleguide'
import { IOMessage } from 'vtex.native-types'
import { useIntl } from 'react-intl'

import {
  useProductAssemblyGroupState,
  useProductAssemblyGroupDispatch,
} from '../ProductAssemblyContext/Group'
import useAssemblyOptionsModifications from '../../modules/useAssemblyOptionsModifications'
import { ProductAssemblyItemProvider } from '../ProductAssemblyContext/Item'
import ProductAssemblyOptionsItem from './ProductAssemblyOptionsItem'
import {
  formatSubscriptionLabel,
  isSubscription,
} from '../../modules/subscriptions'

interface Props {
  initiallyOpened?: 'always' | 'required'
}

const ProductAssemblyOptionsGroup: FC<Props> = ({
  children,
  initiallyOpened = 'required',
}) => {
  const intl = useIntl()
  const assemblyOptionGroup = useProductAssemblyGroupState() as AssemblyOptionGroupState
  const dispatch = useProductAssemblyGroupDispatch()

  useAssemblyOptionsModifications(assemblyOptionGroup)

  const changeOptinInput = () => {
    dispatch({
      type: 'OPTIN',
      args: {
        groupPath: assemblyOptionGroup.path,
      },
    })
  }

  const groupName = isSubscription(assemblyOptionGroup)
    ? formatSubscriptionLabel(assemblyOptionGroup, intl)
    : assemblyOptionGroup.groupName

  return (
    <Fragment>
      {assemblyOptionGroup.optin === false && initiallyOpened === 'required' ? (
        <Button variation="secondary" onClick={changeOptinInput}>
          <IOMessage
            id="store/product-customizer.add-assembly"
            values={{ name: groupName }}
          />
        </Button>
      ) : (
        <Fragment>
          <div className="flex justify-between">
            <div className="ttc-s pv4 c-muted-2 t-small">{groupName}</div>
            {assemblyOptionGroup.required === false && (
              <div>
                <Button
                  size="small"
                  collapseRight
                  variation="tertiary"
                  onClick={changeOptinInput}
                >
                  <IOMessage
                    id="store/product-customizer.remove-assembly"
                    values={{ name: groupName }}
                  />
                </Button>
              </div>
            )}
          </div>
          {assemblyOptionGroup.items ? (
            Object.values(assemblyOptionGroup.items).map((item) => {
              return (
                <ProductAssemblyItemProvider item={item} key={item.id}>
                  <ProductAssemblyOptionsItem>
                    {children}
                  </ProductAssemblyOptionsItem>
                </ProductAssemblyItemProvider>
              )
            })
          ) : (
            <ProductAssemblyItemProvider item={null}>
              {children}
            </ProductAssemblyItemProvider>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductAssemblyOptionsGroup
