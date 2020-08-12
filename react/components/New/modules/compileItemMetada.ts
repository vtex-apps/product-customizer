import { Product } from 'vtex.product-context/useProduct'

function compileItemMetada(
  itemMetadata: Product['itemMetadata']
): Record<string, ItemAssembly> {
  const result: Record<string, ItemAssembly> = {}

  for (const item of itemMetadata.items) {
    const assemblyOptions: AssemblyOptionGroup[] = []
    for (const option of item.assemblyOptions) {
      let composition = null
      if (option.composition) {
        

        composition = {
          minQuantity: option.composition.minQuantity,
          maxQuantity: option.composition.maxQuantity,
          items: option.composition.items.map((item) => compileCompositeItem(item, assemblyId, itemMetadata.priceTable)),
        }
      }

      assemblyOptions.push({
        id: option.id,
        name: option.name,
        required: option.required,
        inputValues: option.inputValues,
        composition: 
      })
    }

    result[item.id] = {
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      seller: item.seller,
      assemblyOptions: 
    }
  }

  return {}
}

function compileCompositeItem(item: CompositionItem, assemblyId: string, priceTable: Product['itemMetadata']['priceTable']) {
  const itemPriceTable = priceTable.find(table => table.type === item.priceTable)
  const priceTableValue = itemPriceTable && itemPriceTable.values.find(value => value.id === item.id && value.assemblyId === assemblyId)

  return {
    id: item.id,
    minQuantity: item.minQuantity,
    maxQuantity: item.maxQuantity,
    priceTable: item.priceTable,
    seller: item.seller,
    initialQuantity: item.initialQuantity,
    price: priceTableValue?.price ?? NaN,
  }
}