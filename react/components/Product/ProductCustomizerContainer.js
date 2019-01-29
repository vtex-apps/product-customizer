import React, { Component } from 'react'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'
import { all, both, propEq, values, find } from 'ramda'

import ProductCustomizerWrapper from './ProductCustomizerWrapper'

class ProductCustomizerContainer extends Component {
  parseProduct(product) {
    console.log('RAW PROD', product)

    const compositionPrices = this.getPriceMap(product.itemMetadata.priceTable)

    const items =
      product.itemMetadata.items.reduce(
        (items, item) => ({ ...items, ...this.parseItemMetada(item, compositionPrices, product.items) }),
        {})

    return {
      productName: product.productName,
      imageUrl: product.items[0].images[0].imageUrl,
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
      const priceMap = values.reduce((currMap, itemPrice) =>
        ({ ...currMap, [itemPrice.id]: itemPrice.price }),
        {})
      return { ...prev, [type]: priceMap }
    },
    {})
  }

  parseAssemblyOption(assemblyOption, prices) {
    const { composition, id } = assemblyOption
    const [_, optionName] = id.split('_')
    const isToggleChoice = all(propEq('maxQuantity', 1))(values(composition.items))
    const items = composition.items.reduce((prev, compCurr) =>
      ({ ...prev, ...this.parseCompositionItem(compCurr, prices, isToggleChoice) }),
    {})
    
    return {
      [optionName]: {
        name: optionName,
        assemblyId: id,
        items,
        properties: {
          maxTotalItems: composition.maxQuantity,
          minTotalItems: composition.minQuantity,
        },
        isSingleChoice: both(propEq('minQuantity', 1), propEq('maxQuantity', 1))(composition),
        isToggleChoice,
      },
    }
  }

  parseCompositionItem(compItem, prices, isToggleChoice) {
    const { product } = this.props.productQuery
    const metadatas = product.itemMetadata.items
    const { id, priceTable } = compItem
    const compMeta = metadatas.find(metadata => metadata.id === id)
    const price = prices[priceTable][id]
    const fullComp = {
      ...compMeta,
      defaultQuantity: isToggleChoice && price === 0 ? 1 : 0,
      ...compItem,
      price,
    }
    return { [compMeta.name]: fullComp }
  }

  getCommertialOfferForMetadata = (itemMetadata, productItems) => {
    const item = find(propEq('itemId', itemMetadata.id))(productItems)
    const seller = find(propEq('sellerId', itemMetadata.seller))(item.sellers)
    return seller && seller.commertialOffer
  }

  parseItemMetada(itemMetada, prices, productItems) {
    if (itemMetada.assemblyOptions.length === 0) {
      return {}
    }
    const name = itemMetada.name
    const attachments = itemMetada.assemblyOptions.reduce((prev, option) =>
      ({ ...prev, ...this.parseAssemblyOption(option, prices) }),
      {})
    const commertialOffer = this.getCommertialOfferForMetadata(itemMetada, productItems)
    return { [name]: { 
      attachments, 
      commertialOffer,
      price: commertialOffer.Price,
      seller: itemMetada.seller,
      skuId: itemMetada.id }, 
    }
  }

  render() {
    const { product } = this.props.productQuery
    if (!product) {
      return null
    }

    return <ProductCustomizerWrapper product={this.parseProduct(product)} />
  }
}

export default orderFormConsumer(ProductCustomizerContainer)
