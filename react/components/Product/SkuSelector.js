import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import { find, pathOr, prop, propEq, sort } from 'ramda'

import SingleChoice from '../Variation/Items/SingleChoice'
import ProductPrice from 'vtex.store-components/ProductPrice'

// Order by availability or by Price
const compareSku = (item, otherItem) => {
  const [
    {
      commertialOffer: { AvailableQuantity: quantity, Price: price },
    },
  ] = item.sellers
  const [
    {
      commertialOffer: { AvailableQuantity: otherQuantity, Price: otherPrice },
    },
  ] = otherItem.sellers

  return quantity === 0 ? 1 : (otherQuantity === 0 && -1) || price - otherPrice
}

const moreThanVariations = (items, count) =>
  pathOr(0, ['0', 'variations', 'length'], items) > count

const getSkuItems = items => sort(compareSku, items)

const getSelectedItem = (items, selectedSku) =>
  selectedSku ? find(propEq('name', selectedSku), items) : null

const saveSkuSelector = (
  onSkuChange,
  skuId,
  items,
  isMainVariation,
  isSecondaryPicked
) => {
  const name = prop('name', find(propEq('itemId', skuId), items))
  onSkuChange(name, false)
}

const SelectorOptions = ({
  productQuery,
  selectedSku,
  onSkuChange,
  parsedItems,
}) => {
  const items = pathOr([], ['product', 'items'], productQuery)
  // If item has variations field, show SKUSelector
  if (moreThanVariations(items, 0)) {
    return (
      <div className="ph5">
        <ExtensionPoint
          id="sku-selector"
          skuItems={getSkuItems(items)}
          skuSelected={getSelectedItem(items, selectedSku)}
          productSlug={productQuery.product.linkText}
          onSKUSelected={(skuId, isMainVariation, isSecondaryPicked) =>
            saveSkuSelector(
              onSkuChange,
              skuId,
              items,
              isMainVariation,
              isSecondaryPicked
            )
          }
          alwaysShowSecondary={false}
        />
      </div>
    )
  }

  // Otherwise, show simple list
  return (
    <Fragment>
      <div className="ph5 pb4 c-muted-2 t-small">
        <FormattedMessage id="product-customizer.pick-size" />
      </div>
      {Object.entries(parsedItems).map(([name, item]) => (
        <SingleChoice
          price={item.price * 100}
          imageUrl={item.imageUrl}
          name={name}
          selected={name === selectedSku}
          onChange={onSkuChange}
          key={name}
          showPlus={false}
        />
      ))}
    </Fragment>
  )
}

function SkuSelector({ items, selectedSku, onSkuChange, productQuery }) {
  return (
    <Fragment>
      <div className="ph5 pt4 pb2 pb4-ns">
        {selectedSku && (
          <ProductPrice
            showListPrice
            showLabels={false}
            sellingPrice={items[selectedSku].commertialOffer.Price}
            listPrice={items[selectedSku].commertialOffer.ListPrice}
            sellingPriceClass="t-heading-2"
            sellingPriceContainerClass="pv2"
            listPriceClass="c-muted-2 strike"
          />
        )}
      </div>
      <SelectorOptions
        productQuery={productQuery}
        selectedSku={selectedSku}
        onSkuChange={onSkuChange}
        parsedItems={items}
      />
    </Fragment>
  )
}

export default SkuSelector
