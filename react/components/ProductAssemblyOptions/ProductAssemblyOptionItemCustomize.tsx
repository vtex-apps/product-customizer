import React, { Fragment, useState, FC } from 'react'
import { useProductAssemblyItem } from '../ProductAssemblyContext'
import { Button, Modal } from 'vtex.styleguide'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { useDevice } from 'vtex.device-detector'
import ProductAssemblyOptionsGroup from './ProductAssemblyOptionsGroup'
import { imageUrlForSize } from './ProductAssemblyOptionItemImage'

const IMG_SIZE = 140

const ModalView: FC<{ closeAction: () => void }> = ({
  children,
  closeAction,
}) => {
  const { item } = useProductAssemblyItem()
  return (
    <div className="flex flex-column">
      <div className="flex">
        <img
          src={imageUrlForSize(item.image, IMG_SIZE)}
          width={IMG_SIZE}
          height={IMG_SIZE}
        />
        <div className="flex flex-column ml5">
          <span className="t-heading-5 c-on-base">{item.name}</span>
          <ProductPrice
            showLabels={false}
            showListPrice={false}
            sellingPriceContainerClass="t-heading-3 c-on-base"
            sellingPrice={item.price / 100}
          />
        </div>
      </div>
      {Object.keys(item.children!).map(childId => {
        return (
          <ProductAssemblyOptionsGroup
            key={childId}
            assemblyOptionState={item.children![childId]}
          >
            {children}
          </ProductAssemblyOptionsGroup>
        )
      })}
      <div className="mt3">
        <Button block onClick={closeAction}>
          <div className="c-on-action-primary">DONE</div>
        </Button>
      </div>
    </div>
  )
}

const ProductAssemblyOptionItemCustomize: FC = ({ children }) => {
  const { item } = useProductAssemblyItem()
  const { isMobile } = useDevice()
  const [modalOpen, setModalOpen] = useState(false)

  if (!item.children) {
    return null
  }

  const closeAction = () => setModalOpen(false)

  return (
    <Fragment>
      <Button variation="tertiary" onClick={() => setModalOpen(true)}>
        <div className="c-action-primary t-action">Customize</div>
      </Button>
      <Modal
        isOpen={modalOpen}
        onClose={closeAction}
        centered={!isMobile}
        title={'Customize your ' + item.name}
      >
        <ModalView closeAction={closeAction}>{children}</ModalView>
      </Modal>
    </Fragment>
  )
}

export default ProductAssemblyOptionItemCustomize
