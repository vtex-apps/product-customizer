declare module 'vtex.product-context/useProduct' {
  export interface SelectedItem {
    itemId: string
    sellers: Array<{
      commertialOffer: {
        AvailableQuantity: number
      }
    }>
  }

  export interface ProductContextInputValue {
    label: string
    maxLength: number
    type: string
    domain: string[] | null
    defaultValue: string
  }

  interface ItemMetadata {
    items: Array<{
      id: string
      name: string
      imageUrl: string
      seller: string
      assemblyOptions: Array<{
        id: string
        name: string
        required: boolean
        inputValues: InputValue[]
        composition: {
          minQuantity: number
          maxQuantity: number
          items: Array<{
            id: string
            minQuantity: number
            maxQuantity: number
            priceTable: string
            seller: string
            initialQuantity: number
          }>
        } | null
      }>
    }>
    priceTable: Array<{
      type: string
      values: Array<{
        id: string
        assemblyId: string
        price: number
      }>
    }>
  }

  export interface Product {
    itemMetadata: ItemMetadata
  }

  const useProduct: () => ProductContext
  export default useProduct

  export interface ProductContext {
    selectedQuantity: number
    product: Product | null
    selectedItem: SelectedItem | null
  }
}

declare module 'vtex.product-context/ProductDispatchContext' {
  type DispatchFunction = (payload: { type: string; args?: unknown }) => void
  export const useProductDispatch: () => DispatchFunction
}
