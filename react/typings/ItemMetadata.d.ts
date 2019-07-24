/**
 * Assembly options related types
 */

interface CompositionItem {
  id: string
  minQuantity: number
  maxQuantity: number
  initialQuantity: number
  priceTable: string
  seller: string
}

interface Composition {
  minQuantity: number
  maxQuantity: number
  items: CompositionItem[]
}

interface AssemblyOption {
  id: string
  name: string
  composition: Composition | null
}

interface MetadataItem {
  id: string
  name: string
  imageUrl: string
  detailUrl: string
  seller: string
  assemblyOptions: AssemblyOption[]
  skuName: string
  productId: string
  refId: string
  ean: string | null
}

interface ItemMetadata {
  items: MetadataItem[]
  priceTable: {
    type: string
    values: {
      id: string
      assemblyId: string
      price: number
    }[]
  }[]
}

interface TreePath {
  itemId: string
  groupId: string
}

interface AssemblyOptionGroup {
  id: string
  minQuantity: number
  maxQuantity: number
  items: Record<string, AssemblyItem>
  groupName: string
  treePath: TreePath[]
}

interface AssemblyItem {
  image: string
  name: string
  id: string
  price: number
  minQuantity: number
  maxQuantity: number
  seller: string
  initialQuantity: number
  quantity: number
  children: Record<string, AssemblyOptionGroup> | null
}
