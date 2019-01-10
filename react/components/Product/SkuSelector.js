import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import SingleChoice from '../Variation/Items/SingleChoice';
import ProductPrice from 'vtex.store-components/ProductPrice'

function SkuSelector({ items, selectedSku, onSkuChange, skuCommertialOffer }) {
  return (
    <Fragment>
      <div className="ph5 pt4 pb2 pb4-ns">
        <ProductPrice
          showListPrice={true}
          showLabels={false}
          sellingPrice={skuCommertialOffer.Price}
          listPrice={skuCommertialOffer.ListPrice}
          sellingPriceClass="t-heading-2"
          sellingPriceContainerClass="pv2"
          listPriceClass="c-muted-2 strike"
        />
      </div>
      <div className="ph5 pb4 c-muted-2 t-small">
        <FormattedMessage id="product-customizer.pick-size" />
      </div>
      {items.map(item =>
        <SingleChoice item={{ name: item }} selected={item === selectedSku} onChange={() => onSkuChange(item)} key={item} />
      )}
    </Fragment>
  )
}

export default SkuSelector