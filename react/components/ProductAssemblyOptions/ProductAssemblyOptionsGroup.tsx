import React, { FC, Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessage } from 'vtex.native-types'
import { Button } from 'vtex.styleguide'

import {
  formatSubscriptionLabel,
  isSubscriptionRelated,
} from '../../modules/subscriptions'
import useAssemblyOptionsModifications from '../../modules/useAssemblyOptionsModifications'
import {
  useProductAssemblyGroupDispatch,
  useProductAssemblyGroupState,
} from '../ProductAssemblyContext/Group'
import { ProductAssemblyItemProvider } from '../ProductAssemblyContext/Item'
import ProductAssemblyOptionsItem from './ProductAssemblyOptionsItem'

const CSS_HANDLES = [
  'productAssemblyGroupName',
  'productAssemblyGroupNameRow',
  'productAssemblyGroupRequiredTag',
] as const

interface Props {
  initiallyOpened?: 'always' | 'required'
}

const ProductAssemblyOptionsGroup: FC<Props> = ({
  children,
  initiallyOpened = 'required',
}) => {
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)
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

  const groupName = isSubscriptionRelated(assemblyOptionGroup.groupName)
    ? formatSubscriptionLabel(assemblyOptionGroup.groupName, intl)
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
          <div
            className={`${handles.productAssemblyGroupNameRow} flex justify-between items-center`}
          >
            <div
              className={`${handles.productAssemblyGroupName} ttc-s pv4 c-muted-2 t-small`}
            >
              {groupName}
            </div>
            {assemblyOptionGroup.required === false ? (
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
            ) : (
              <div className={`${handles.productAssemblyGroupRequiredTag} f7`}>
                <FormattedMessage id="store/product-customizer.required" />
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
