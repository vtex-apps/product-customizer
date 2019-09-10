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
  inputValues: AttachmentField[]
}

interface AttachmentField {
  label: string
  maxLength: number | null
  type: AttachmentType | string // Accepting string so JSON imports work
  domain: string[] | null
}

type AttachmentType = 'TEXT' | 'BOOLEAN' | 'OPTIONS'

interface MetadataItem {
  id: string
  name: string
  imageUrl: string
  seller: string
  assemblyOptions: AssemblyOption[]
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

type GroupTypes = 'SINGLE' | 'TOGGLE' | 'MULTIPLE'

interface AssemblyOptionGroup {
  id: string
  minQuantity: number
  maxQuantity: number
  items: Record<string, AssemblyItem>
  groupName: string
  treePath: TreePath[]
  type: GroupTypes
  inputValues: AttachmentField[]
}

interface AssemblyOptionGroupAttachment {
  id: string
  minQuantity: undefined
  maxQuantity: undefined
  items: undefined
  groupName: string
  treePath: TreePath[]
  type: GroupTypes
  inputValues: AttachmentField[]
}

type AssemblyOptionGroupType = AssemblyOptionGroup | AssemblyOptionGroupAttachment

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
  children: Record<string, AssemblyOptionGroupType> | null
}
