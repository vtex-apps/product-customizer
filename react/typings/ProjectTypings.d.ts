/**
 * Assembly options related types
 */
import { InputValueType } from '../modules/inputValueType'
declare global {
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
    inputValues: InputValue[]
  }

  type InputValue = TextInputValue | BooleanInputValue | OptionsInputValue

  interface TextInputValue {
    type: InputValueType.TEXT
    label: string
    maxLength: number
    domain: null
  }

  interface BooleanInputValue {
    type: InputValueType.BOOLEAN
    label: string
    maxLength: null
    domain: null
  }

  interface OptionsInputValue {
    type: InputValueType.OPTIONS
    label: string
    maxLength: null
    domain: string[]
  }

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
    valuesOfInputValues: Record<string, string>
    inputValues: InputValue[]

    path: string[]
    quantitySum: number
  }

  interface AssemblyOptionGroupInputValue {
    id: string
    minQuantity: undefined
    maxQuantity: undefined
    items: undefined
    groupName: string
    treePath: TreePath[]
    type: GroupTypes
    valuesOfInputValues: Record<string, string>
    inputValues: InputValue[]

    path: string[]
    quantitySum: number
  }

  type AssemblyOptionGroupType = AssemblyOptionGroup | AssemblyOptionGroupInputValue

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
}