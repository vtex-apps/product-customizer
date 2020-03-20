import React, { FC } from 'react'
import { Checkbox, Radio, NumericStepper } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import { useProductAssemblyItem } from '../ProductAssemblyContext/Item'
import { GROUP_TYPES } from '../../modules/assemblyGroupType'
import {
  useProductAssemblyGroupState,
  useProductAssemblyGroupDispatch,
} from '../ProductAssemblyContext/Group'
import { withItem } from './withItem'

const CSS_HANDLES = ['multipleItemQuantitySelector'] as const

const Single: FC = () => {
  const { id, quantity } = useProductAssemblyItem() as AssemblyItem
  const { path } = useProductAssemblyGroupState() as AssemblyOptionGroup
  const dispatch = useProductAssemblyGroupDispatch()
  const selected = quantity === 1

  return (
    <div
      onClick={() => {
        if (quantity === 0) {
          dispatch({
            type: 'SET_QUANTITY',
            args: {
              itemId: id,
              newQuantity: 1,
              type: GROUP_TYPES.SINGLE,
              groupPath: path,
            },
          })
        }
      }}
    >
      {/* TODO: Properly use Radio from Styleguide */}
      <Radio
        checked={selected}
        id=""
        label=""
        name=""
        value=""
        onChange={() => {}}
      />
    </div>
  )
}

const Toggle: FC = () => {
  const { id, quantity, minQuantity } = useProductAssemblyItem() as AssemblyItem
  const { path } = useProductAssemblyGroupState() as AssemblyOptionGroup
  const dispatch = useProductAssemblyGroupDispatch()

  const selected = quantity === 1
  const disabled = minQuantity === 1

  return (
    <Checkbox
      disabled={disabled}
      name={`selected-${id}`}
      checked={selected}
      onChange={() => {
        dispatch({
          type: 'SET_QUANTITY',
          args: {
            itemId: id,
            newQuantity: quantity === 1 ? 0 : 1,
            type: GROUP_TYPES.TOGGLE,
            groupPath: path,
          },
        })
      }}
    />
  )
}

const Multiple: FC = () => {
  const {
    quantity,
    maxQuantity,
    minQuantity,
    id,
  } = useProductAssemblyItem() as AssemblyItem
  const {
    path,
    maxQuantity: groupMaxQuantity,
    quantitySum,
  } = useProductAssemblyGroupState() as AssemblyOptionGroup

  const dispatch = useProductAssemblyGroupDispatch()

  const canIncrease =
    quantity + 1 <= maxQuantity && quantitySum + 1 <= groupMaxQuantity

  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div
      className={handles.multipleItemQuantitySelector}
      data-testid={`multipleItemQuantitySelector-${id}`}
    >
      <NumericStepper
        lean
        value={quantity}
        minValue={minQuantity}
        maxValue={canIncrease ? undefined : quantity}
        onChange={({ value }: { value: number }) => {
          dispatch({
            type: 'SET_QUANTITY',
            args: {
              itemId: id,
              newQuantity: value,
              type: GROUP_TYPES.MULTIPLE,
              groupPath: path,
            },
          })
        }}
      />
    </div>
  )
}

const Quantity: FC = () => {
  const { type } = useProductAssemblyGroupState() as AssemblyOptionGroup

  if (type === 'SINGLE') {
    return <Single />
  }

  if (type === 'TOGGLE') {
    return <Toggle />
  }

  return <Multiple />
}

export default withItem(Quantity)
