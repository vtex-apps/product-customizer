import React, { Component } from 'react'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'
import itemsMock from './mock/itemsMock.json'
import { head } from 'ramda'

import ProductCustomizerWrapper from './ProductCustomizerWrapper'

class ProductCustomizerContainer extends Component {
  parseProduct(product) {
    console.log('teste === props: ', this.props)
    console.log('teste ===== itemsMock: ', itemsMock)
    console.log('RAW PROD', product)
    const items =
      product.items.reduce(
        (items, sku) => ({ ...items, [sku.name]: this.parseSku(sku) }), {})

    const compositionPrices = this.getPriceMap(product.itemMetadata.priceTable)
    console.log('raw ==== compositionPrices: ', compositionPrices)

    const teste =
      itemsMock.itemMetadata.items.reduce(
        (items, item) => ({ ...items, ...this.parseItemMetada(item, compositionPrices) }), {})
    console.log('teste === teste: ', teste)
    console.log('teste === items: ', items)

    const sellers = head(product.items).sellers
    // console.log('RAW PROD', product)
    return {
      productName: product.productName,
      imageUrl: product.items[0].images[0].imageUrl,
      items: teste,
      sellerId: sellers.find(seller => seller.sellerDefault).sellerId,
    }
  }

  getPriceMap(priceTable) {
    return priceTable.reduce((prev, curr) => {
      const { type, values } = curr
      const priceMap = values.reduce((currMap, itemPrice) => ({ ...currMap, [itemPrice.id]: itemPrice.price }), {})
      return { ...prev, [type]: priceMap }
    }, {})
  }

  parseAssemblyOption(assemblyOption, prices) {
    const { composition, id } = assemblyOption
    const [_, optionName] = id.split('_')
    const items = composition.items.reduce((prev, compCurr) => ({ ...prev, ...this.parseCompositionItem(compCurr, prices) }), {})
    return {
      [optionName]: {
        name: optionName,
        items,
        properties: {
          maxTotalItems: composition.maxQuantity,
          minTotalItems: composition.minQuantity,
        },
      },
    }
  }

  parseCompositionItem(compItem, prices) {
    const metadatas = itemsMock.itemMetadata.items // TODO Use coming from server!
    const { id, priceTable } = compItem
    const compMeta = metadatas.find(metadata => metadata.id === id)
    const fullComp = {
      ...compMeta,
      defaultQuantity: priceTable === 'basic' ? 1 : 0, // maybe use price === 0 comparison
      ...compItem,
      price: prices[priceTable][id],
    }
    return { [compMeta.name]: fullComp }
  }

  parseItemMetada(itemMetada, prices) {
    if (itemMetada.assemblyOptions.length === 0) {
      return {}
    }
    const name = itemMetada.skuName
    const attachments = itemMetada.assemblyOptions.reduce((prev, option) =>
      ({ ...prev, ...this.parseAssemblyOption(option, prices) }), {})
    return { [name]: { attachments, assemblyIdPreffix: itemMetada.assemblyOptions[0].name, skuId: itemMetada.id } }
  }

  parseSku(sku) {
    const calculatedAttachments = JSON.parse(sku.calculatedAttachments)
    const names = Object.keys(calculatedAttachments.items)
    const attachments =
      names.reduce(
        (items, name) => ({ ...items, [name]: this.parseAttachment(name, calculatedAttachments) }), {})
    return { attachments, assemblyId: sku.attachments[0].name, skuId: sku.itemId }
  }

  parseAttachment(name, attachments) {
    return {
      name,
      items: this.parseAttchmentItems(attachments.items[name]),
      properties: {
        ...attachments.properties[name],
        required: attachments.required.includes(name),
      },
    }
  }

  parseAttchmentItems(items) {
    return items.reduce((acc, item) => ({ ...acc, [item.name]: item }), {})
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
