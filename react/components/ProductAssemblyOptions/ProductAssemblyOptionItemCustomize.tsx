import React, { FC, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { Button, Modal } from 'vtex.styleguide'

import { ProductAssemblyGroupContextProvider } from '../ProductAssemblyContext/Group'
import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'
import StopPropagation from '../StopPropagation'
import { imageUrlForSize } from './ProductAssemblyOptionItemImage'
import ProductAssemblyOptionsGroup from './ProductAssemblyOptionsGroup'
import { withItem } from './withItem'

const CSS_HANDLES = [
  'modalViewProductContainer',
  'modalViewProductImage',
  'modalViewProductName',
  'modalViewProductInfos',
  'modalViewDoneButton',
  'modalViewTitle',
  'productAssemblyOptionItemCustomize',
  'productAssemblyOptionItemCustomizeLabel',
] as const

const IMG_SIZE = 140

const ModalView: FC<{ closeAction: () => void }> = ({
  children,
  closeAction,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const intl = useIntl()
  const {
    image,
    name,
    children: itemChildren,
    price,
  } = useProductAssemblyItem() as AssemblyItem

  return (
    <div className="flex flex-column">
      <div className={`${handles.modalViewProductContainer} flex`}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className={handles.modalViewProductImage}
          src={imageUrlForSize(image, IMG_SIZE)}
          width={IMG_SIZE}
          height={IMG_SIZE}
        />
        <div
          className={`${handles.modalViewProductInfos} flex flex-column ml5`}
        >
          <span
            className={`${handles.modalViewProductName} t-heading-5 c-on-base`}
          >
            {name}
          </span>
          <ProductPrice
            showLabels={false}
            showListPrice={false}
            sellingPriceContainerClass="t-heading-3 c-on-base"
            sellingPrice={price / 100}
          />
        </div>
      </div>
      {itemChildren &&
        Object.keys(itemChildren).map((childId) => {
          return (
            <ProductAssemblyGroupContextProvider
              key={childId}
              assemblyOption={itemChildren[childId]}
            >
              <ProductAssemblyOptionsGroup>
                {children}
              </ProductAssemblyOptionsGroup>
            </ProductAssemblyGroupContextProvider>
          )
        })}
      <div className={`${handles.modalViewDoneButton} mt3`}>
        <Button block onClick={closeAction}>
          {intl.formatMessage({
            id: 'store/product-customizer.modal-view.done-button',
          })}
        </Button>
      </div>
    </div>
  )
}

interface Props {
  buttonProps?: ButtonProps
  modalProps?: any
}

interface ButtonProps {
  collapse?: 'left' | 'right' | 'none'
}

const hasValues = (itemChildren: any) => {
  const [name] = Object.getOwnPropertyNames(itemChildren)
  const inputs = itemChildren[name].inputValues

  if (!itemChildren[name]?.valuesOfInputValues) {
    return false
  }

  return (
    inputs.findIndex((input: { label: string }) => {
      return itemChildren[name].valuesOfInputValues[input.label] !== ''
    }) !== -1
  )
}

const ProductAssemblyOptionItemCustomize: FC<Props> = ({
  children,
  buttonProps = {},
  modalProps = {},
}) => {
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)
  const {
    name,
    children: itemChildren,
  } = useProductAssemblyItem() as AssemblyItem

  const { isMobile } = useDevice()
  const buttonCollapse = buttonProps.collapse
  const [modalOpen, setModalOpen] = useState(false)

  if (!itemChildren) {
    return null
  }

  const handleClick = (e: any) => {
    if (hasValues(itemChildren)) {
      e.stopPropagation()
    }

    setModalOpen(true)
  }

  const closeAction = () => setModalOpen(false)

  return (
    <div className={handles.productAssemblyOptionItemCustomize}>
      <Button
        variation="tertiary"
        onClick={handleClick}
        collapseLeft={buttonCollapse === 'left'}
        collapseRight={buttonCollapse === 'right'}
        {...buttonProps}
      >
        <div
          className={`${handles.productAssemblyOptionItemCustomizeLabel} c-action-primary t-action`}
        >
          <FormattedMessage id="store/product-customizer.customize" />
        </div>
      </Button>
      <StopPropagation>
        <Modal
          isOpen={modalOpen}
          onClose={closeAction}
          centered={!isMobile}
          title={
            <div className={handles.modalViewTitle}>
              {intl.formatMessage(
                {
                  id: 'store/product-customizer.modal-view.title',
                },
                { name }
              )}
            </div>
          }
          {...modalProps}
        >
          <ModalView closeAction={closeAction}>{children}</ModalView>
        </Modal>
      </StopPropagation>
    </div>
  )
}

export default withItem(ProductAssemblyOptionItemCustomize)
