import React, { Component } from 'react'
import { all, both, propEq, values, find, path, prop, findLast } from 'ramda'

import ProductCustomizerWrapper from './ProductCustomizerWrapper'

class ProductCustomizerContainer extends Component {
  parseProduct(product) {
    const compositionPrices = this.getPriceMap(product.itemMetadata.priceTable)

    const items = product.itemMetadata.items.reduce(
      (items, item) => ({
        ...items,
        ...this.parseItemMetadata(item, compositionPrices, product.items),
      }),
      {}
    )

    return {
      productName: product.productName,
      imageUrl: product.items[0].images[0].imageUrl,
      imageText: product.items[0].images[0].imageText,
      items,
    }
  }

  /**
   * Produces an object in which each key is a price table (like small) and the fields are objects that map
   * product ids to its prices
   */
  getPriceMap(priceTable) {
    return priceTable.reduce((prev, curr) => {
      const { type, values } = curr
      const priceMap = values.reduce(
        (currMap, itemPrice) => ({
          ...currMap,
          [itemPrice.id]: itemPrice.price,
        }),
        {}
      )
      return { ...prev, [type]: priceMap }
    }, {})
  }

  parseAssemblyOption(assemblyOption, prices) {
    const { composition, id } = assemblyOption
    const [_, optionName] = id.split('_')
    const items = composition.items.reduce(
      (prev, compCurr) => ({
        ...prev,
        ...this.parseCompositionItem(compCurr, prices),
      }),
      {}
    )

    return {
      [optionName]: {
        name: optionName,
        assemblyId: id,
        items,
        properties: {
          maxTotalItems: composition.maxQuantity,
          minTotalItems: composition.minQuantity,
        },
        isSingleChoice: both(
          propEq('minQuantity', 1),
          propEq('maxQuantity', 1)
        )(composition),
        isToggleChoice: all(propEq('maxQuantity', 1))(
          values(composition.items)
        ),
      },
    }
  }

  parseCompositionItem(compItem, prices) {
    const { product } = this.props.productQuery
    const metadatas = product.itemMetadata.items
    const { id, priceTable } = compItem
    const compMeta = metadatas.find(metadata => metadata.id === id)
    const price = prices[priceTable][id]
    const fullComp = {
      ...compMeta,
      ...compItem,
      price,
    }
    return { [compMeta.name]: fullComp }
  }

  parseItemMetadata(itemMetadata, prices, productItems) {
    if (itemMetadata.assemblyOptions.length === 0) {
      return {}
    }
    const { name } = itemMetadata
    const attachments = itemMetadata.assemblyOptions.reduce(
      (prev, option) => ({
        ...prev,
        ...this.parseAssemblyOption(option, prices),
      }),
      {}
    )
    const productItem = find(propEq('itemId', itemMetadata.id))(productItems)
    const crustImage = prop('imageUrl')(
      findLast(propEq('imageLabel', 'Crust'))(productItem.images)
    )
    const commertialOffer = prop('commertialOffer')(
      find(propEq('sellerId', itemMetadata.seller))(productItem.sellers)
    )
    return {
      [name]: {
        attachments,
        commertialOffer,
        imageUrl: crustImage,
        price: commertialOffer.Price,
        seller: itemMetadata.seller,
        skuId: itemMetadata.id,
        listPrice: commertialOffer.ListPrice,
        name: productItem.nameComplete,
        detailUrl: `${this.props.productQuery.product.linkText}/p`,
        skuImageUrl: path(['images', '0', 'imageUrl'], productItem),
      },
    }
  }

  render() {
    const { product } = this.props.productQuery
    if (!product) {
      return null
    }

    return (
      <ProductCustomizerWrapper
        productQuery={this.props.productQuery}
        product={this.parseProduct(product)}
      />
    )
  }
}

export default ProductCustomizerContainer
