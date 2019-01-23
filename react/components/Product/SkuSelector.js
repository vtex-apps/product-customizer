import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import SingleChoice from '../Variation/Items/SingleChoice';
import ProductPrice from 'vtex.store-components/ProductPrice'

function SkuSelector({ items, selectedSku, onSkuChange }) {
  return (
    <Fragment>
      <div className="ph5 pt4 pb2 pb4-ns">
        {selectedSku && (
          <ProductPrice
            showListPrice={true}
            showLabels={false}
            sellingPrice={items[selectedSku].commertialOffer.Price}
            listPrice={items[selectedSku].commertialOffer.ListPrice}
            sellingPriceClass="t-heading-2"
            sellingPriceContainerClass="pv2"
            listPriceClass="c-muted-2 strike"
          />
        )}
      </div>
      <div className="ph5 pb4 c-muted-2 t-small">
        <FormattedMessage id="product-customizer.pick-size" />
      </div>
      {Object.keys(items).map(item =>
        <SingleChoice 
          item={{ name: item, price: items[item].price * 100 }}
          selected={item === selectedSku}
          onChange={() => onSkuChange(item)}
          key={item}
          showPlus={false}
        />
      )}
    </Fragment>
  )
}


//passar price para item
export default SkuSelector