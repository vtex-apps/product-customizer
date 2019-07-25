import React, { useMemo, FC, Fragment } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { find, propEq, compose, last, split, pathOr } from 'ramda'
import StateManager from './components/ProductAssemblyOptions/StateManager'

type PriceMap = Record<string, Record<string, Record<string, number>>>

const findItemMetadata = (id: string) => find<MetadataItem>(propEq('id', id))
const splitGroupName = compose(
  last,
  split('_')
)

const getItemAssemblyOptions = (
  selectedItem: SelectedItem,
  itemMetadata: ItemMetadata
) => {
  if (!itemMetadata || !itemMetadata.items) {
    return null
  }
  const metadata = findItemMetadata(selectedItem.itemId)(itemMetadata.items)
  return metadata && metadata.assemblyOptions
}

const parsePriceMap = (itemMetadata: ItemMetadata) => {
  const result = {} as PriceMap
  for (const priceTableItem of itemMetadata.priceTable) {
    const { type } = priceTableItem
    result[type] = {}
    for (const priceItem of priceTableItem.values) {
      const groupPrices = result[type][priceItem.assemblyId] || {}
      groupPrices[priceItem.id] = priceItem.price
      result[type][priceItem.assemblyId] = groupPrices
    }
  }
  return result
}

const parseAssemblyOptions = (
  assemblyOptions: AssemblyOption[],
  priceMap: PriceMap,
  product: Product,
  parentItemId?: string,
  treePath?: TreePath[]
) => {
  const assemblyOptionsParsed = {} as Record<string, AssemblyOptionGroup>
  for (const assemblyOption of assemblyOptions) {
    if (!assemblyOption.composition) {
      continue
    }
    const currentTreePath =
      parentItemId && treePath
        ? [...treePath, { itemId: parentItemId, groupId: assemblyOption.id }]
        : []
    assemblyOptionsParsed[assemblyOption.id] = {
      id: assemblyOption.id,
      minQuantity: assemblyOption.composition.minQuantity,
      maxQuantity: assemblyOption.composition.maxQuantity,
      items: {},
      groupName: splitGroupName(assemblyOption.id),
      treePath: currentTreePath,
    }
    const items = {} as Record<string, AssemblyItem>
    for (const assemblyItem of assemblyOption.composition.items) {
      const optionMetadata = findItemMetadata(assemblyItem.id)(
        product.itemMetadata.items
      )

      // Recursively parse children of this assembly option
      const children =
        optionMetadata!.assemblyOptions.length > 0
          ? parseAssemblyOptions(
              optionMetadata!.assemblyOptions,
              priceMap,
              product,
              assemblyItem.id,
              currentTreePath
            )
          : null
      items[assemblyItem.id] = {
        image: optionMetadata!.imageUrl,
        name: optionMetadata!.name,
        id: assemblyItem.id,
        price: pathOr(
          0,
          [assemblyItem.priceTable, assemblyOption.id, assemblyItem.id],
          priceMap
        ),
        minQuantity: assemblyItem.minQuantity,
        maxQuantity: assemblyItem.maxQuantity,
        seller: assemblyItem.seller,
        initialQuantity: assemblyItem.initialQuantity,
        quantity: assemblyItem.initialQuantity,
        children,
      }
    }
    assemblyOptionsParsed[assemblyOption.id].items = items
  }
  return assemblyOptionsParsed
}

const useAssemblyOptions = () => {
  const { product, selectedItem } = useProduct()
  return useMemo(() => {
    if (!selectedItem || !product) {
      return null
    }
    const assemblyOptions = getItemAssemblyOptions(
      selectedItem,
      product.itemMetadata
    )
    if (!assemblyOptions || assemblyOptions.length === 0) {
      return null
    }

    const priceMap = parsePriceMap(product.itemMetadata)
    return parseAssemblyOptions(assemblyOptions, priceMap, product)
  }, [product, selectedItem])
}

const ProductAssemblyOptions: FC = ({ children }) => {
  const assemblyOptions = useAssemblyOptions()
  if (!assemblyOptions) {
    return null
  }

  return (
    <Fragment>
      {Object.keys(assemblyOptions).map(assemblyOptionId => {
        return (
          <StateManager
            key={assemblyOptionId}
            assemblyOption={assemblyOptions[assemblyOptionId]}
          >
            {children}
          </StateManager>
        )
      })}
    </Fragment>
  )
}
export default ProductAssemblyOptions
