import { useEffect } from 'react'
import { pick } from 'ramda'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

export default function useAssemblyOptionsModifications(
  localState: AssemblyOptionGroupState
) {
  const dispatch = useProductDispatch()

  useEffect(() => {
    const {
      items: localItems,
      id,
      type,
      valuesOfInputValues,
      optin,
    } = localState
    const items = Object.values(localItems || {}).map(parseItem(type))
    const isValid = isGroupValid(localState)
    const groupInputValues = optin ? valuesOfInputValues : {}

    dispatch({
      type: 'SET_ASSEMBLY_OPTIONS',
      args: {
        groupId: id,
        groupItems: items,
        groupInputValues,
        isValid,
      },
    })
  }, [localState, dispatch])
}

function isGroupValid(group: AssemblyOptionGroupState) {
  const items = Object.values(group.items || {})
  const itemsToBeAdded = items.reduce((acc, { quantity }) => acc + quantity, 0)
  const isValid =
    (group.maxQuantity !== undefined &&
      group.maxQuantity >= itemsToBeAdded &&
      group.minQuantity <= itemsToBeAdded) ||
    group.maxQuantity === undefined

  if (!isValid) {
    // No need to check children if group is already invalid
    return false
  }

  const areItemsValid = items.every(item => {
    if (!item.children) {
      return true
    }
    const childrenGroups = Object.values(item.children)
    const areChildrenValid = childrenGroups.every(childGroup =>
      isGroupValid(childGroup)
    )
    return areChildrenValid
  })

  return areItemsValid
}

function parseItem(groupType: GroupTypes) {
  return (item: AssemblyItem) => ({
    ...pick(['name', 'id', 'initialQuantity', 'quantity', 'seller'], item),
    price: item.price / 100,
    choiceType: groupType,
    children: item.children ? parseItemChildren(item.children) : null,
  })
}

interface BuyButtonItem {
  name: string
  id: string
  initialQuantity: number
  quantity: number
  seller: string
  price: number
  choiceType: GroupTypes
  children: Record<string, BuyButtonItem[]> | null
}

function parseItemChildren(children: Record<string, AssemblyOptionGroupState>) {
  const groupIds = Object.keys(children)
  const result: Record<string, BuyButtonItem[]> = {}

  for (const groupId of groupIds) {
    const childrenAssemblyOption = children[groupId]
    result[groupId] = Object.values(childrenAssemblyOption.items || {}).map(
      parseItem(childrenAssemblyOption.type)
    )
  }

  return result
}
