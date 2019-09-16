import { useMemo } from 'react'
import useProduct, { SelectedItem, Product } from 'vtex.product-context/useProduct'
import { find, propEq, compose, last, split, pathOr } from 'ramda'
import { getGroupType } from './assemblyGroupType'

const splitGroupName = compose(
  last,
  split('_')
)

type PriceMap = Record<string, Record<string, Record<string, number>>>
type ParsedAssemblyOptions = Record<string, AssemblyOptionGroupType>

const findItemMetadata = (id: string) => find<MetadataItem>(propEq('id', id))

function useAssemblyOptions(): ParsedAssemblyOptions | null {
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

function getItemAssemblyOptions(
  selectedItem: SelectedItem,
  itemMetadata: ItemMetadata
) {
  if (!itemMetadata || !itemMetadata.items) {
    return null
  }
  const metadata = findItemMetadata(selectedItem.itemId)(itemMetadata.items)
  return metadata && metadata.assemblyOptions
}

function parsePriceMap(itemMetadata: ItemMetadata) {
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
): ParsedAssemblyOptions => {
  const assemblyOptionsParsed = assemblyOptions.reduce<ParsedAssemblyOptions>(
    (assemblyOptionsParsed, assemblyOption) => {
      if (!assemblyOption.composition && !assemblyOption.inputValues) {
        return assemblyOptionsParsed
      }

      const currentTreePath =
        parentItemId && treePath
          ? [...treePath, { itemId: parentItemId, groupId: assemblyOption.id }]
          : []

      if (assemblyOption.composition) {
        const items = assemblyOption.composition.items
          ? assemblyItems(priceMap, product, currentTreePath, assemblyOption)
          : undefined

        assemblyOptionsParsed[assemblyOption.id] = {
          id: assemblyOption.id,
          minQuantity: assemblyOption.composition.minQuantity,
          maxQuantity: assemblyOption.composition.maxQuantity,
          groupName: splitGroupName(assemblyOption.id),
          treePath: currentTreePath,
          type: getGroupType(assemblyOption),
          inputValues: assemblyOption.inputValues,
          items,
        } as AssemblyOptionGroup
      } else {
        assemblyOptionsParsed[assemblyOption.id] = {
          id: assemblyOption.id,
          minQuantity: undefined,
          maxQuantity: undefined,
          groupName: splitGroupName(assemblyOption.id),
          treePath: currentTreePath,
          type: getGroupType(assemblyOption),
          inputValues: assemblyOption.inputValues,
          items: undefined,
        } as AssemblyOptionGroupInputValue
      }

      return assemblyOptionsParsed
    }
    , {})

  return assemblyOptionsParsed
}

function assemblyItems(priceMap: PriceMap, product: Product, currentTreePath: TreePath[], assemblyOption: AssemblyOption) {
  if (!assemblyOption.composition || !assemblyOption.composition.items) {
    return undefined
  }

  return assemblyOption.composition.items.reduce<Record<string, AssemblyItem>>(
    (items, assemblyItem) => {
      const optionMetadata = findItemMetadata(assemblyItem.id)(
        product.itemMetadata.items
      )

      if (!optionMetadata) {
        return items
      }

      // Recursively parse children of this assembly option
      const children = optionMetadata.assemblyOptions.length > 0
        ? parseAssemblyOptions(
          optionMetadata!.assemblyOptions,
          priceMap,
          product,
          assemblyItem.id,
          currentTreePath
        )
        : null

      items[assemblyItem.id] = {
        image: optionMetadata.imageUrl,
        name: optionMetadata.name,
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

      return items
    }
    , {})
}



export default useAssemblyOptions