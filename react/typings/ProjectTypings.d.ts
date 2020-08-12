/**
 * Assembly options related types
 */
import { InputValueType } from '../modules/inputValueType'

declare global {
  interface AssemblyOption {
    id: string
    name: string
    required: boolean
    composition: Composition | null
    inputValues: InputValue[]
  }

  interface Composition {
    minQuantity: number
    maxQuantity: number
    items: CompositionItem[]
  }

  interface CompositionItem {
    id: string
    minQuantity: number
    maxQuantity: number
    initialQuantity: number
    priceTable: string
    seller: string
  }

  type InputValue = TextInputValue | BooleanInputValue | OptionsInputValue

  interface TextInputValue {
    type: 'TEXT'
    defaultValue: ''
    label: string
    maxLength: number
    domain: null
  }

  interface BooleanInputValue {
    type: 'BOOLEAN'
    defaultValue: boolean
    label: string
    maxLength: null
    domain: null
  }

  interface OptionsInputValue {
    type: 'OPTIONS'
    defaultValue: string
    label: string
    maxLength: null
    domain: string[]
  }

  interface ItemMetadata {
    items: MetadataItem[]
    priceTable: Array<{
      type: string
      values: Array<{
        id: string
        assemblyId: string
        price: number
      }>
    }>
  }

  interface MetadataItem {
    id: string
    name: string
    imageUrl: string
    seller: string
    assemblyOptions: AssemblyOption[]
  }

  type GroupTypes = 'SINGLE' | 'TOGGLE' | 'MULTIPLE'

  type AssemblyOptionItemId = string

  interface AssemblyOptionItem {
    id: AssemblyOptionItemId
    image: string
    name: string
    price: number
    minQuantity: number
    maxQuantity: number
    seller: string
    initialQuantity: number
    assemblyOptions: Record<string, AssemblyOptionGroup> | null
  }

  type AssemblyOptionPathId = AssemblyOptionGroupId | AssemblyOptionItemId

  export interface ItemAssembly {
    id: string
    seller: string
    options: AssemblyOptionGroup[]
  }

  interface AssemblyOptionGroup extends AssemblyOption {
    type: GroupTypes
    composition: GroupComposition | null
  }

  interface GroupComposition extends Composition {
    items: GroupCompositionItem[]
  }

  interface GroupCompositionItem extends CompositionItem {
    price: number
  }

  interface AssemblyState {
    productId: string
    assemblyPath: AssemblyOptionPathId
    totalQuantitySelected: number
    selectedItems: SelectedAssemblyItem[]

    inputValues: Record<string, string | boolean>
    optin: boolean
  }

  interface SelectedAssemblyItem {
    id: AssemblyOptionItemId
    quantity: number
  }
}
