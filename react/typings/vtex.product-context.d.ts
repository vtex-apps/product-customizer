declare module 'vtex.product-context/useProduct' {
  import { ItemMetadata } from '../modules/AssemblyTypings'

  export interface SelectedItem {
    itemId: string
    sellers: Array<{
      commertialOffer: {
        AvailableQuantity: number
      }
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
