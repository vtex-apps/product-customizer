import React, { FC } from 'react'
import {
  useProductAssemblyItem,
  useProductAssemblyDispatch,
} from '../ProductAssemblyContext'
import { Checkbox, Radio, NumericStepper } from 'vtex.styleguide'
import styles from './styles.css'
import { GROUP_TYPES } from '../../utils'

const Single: FC = () => {
  const { item, groupPath } = useProductAssemblyItem()
  const dispatch = useProductAssemblyDispatch()
  const selected = item.quantity === 1
  return (
    <div
      onClick={() => {
        if (item.quantity === 0) {
          dispatch({
            type: 'SET_QUANTITY',
            args: {
              itemId: item.id,
              newQuantity: 1,
              type: GROUP_TYPES.SINGLE,
              groupPath,
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
  const { item, groupPath } = useProductAssemblyItem()
  const dispatch = useProductAssemblyDispatch()
  const selected = item.quantity === 1
  const disabled = item.minQuantity === 1
  return (
    <Checkbox
      disabled={disabled}
      name={`selected-${item.id}`}
      checked={selected}
      onChange={() => {
        dispatch({
          type: 'SET_QUANTITY',
          args: {
            itemId: item.id,
            newQuantity: item.quantity === 1 ? 0 : 1,
            type: GROUP_TYPES.TOGGLE,
            groupPath,
          },
        })
      }}
    />
  )
}

const Multiple: FC = () => {
  const {
    item,
    groupQuantitySum,
    groupMaxQuantity,
    groupPath,
  } = useProductAssemblyItem()
  const dispatch = useProductAssemblyDispatch()
  const canIncrease =
    item.quantity + 1 <= item.maxQuantity &&
    groupQuantitySum + 1 <= groupMaxQuantity

  return (
    <div className={styles.multipleItemQuantitySelector}>
      <NumericStepper
        lean
        value={item.quantity}
        minValue={item.minQuantity}
        maxValue={canIncrease ? undefined : item.quantity}
        onChange={({ value }: { value: number }) => {
          dispatch({
            type: 'SET_QUANTITY',
            args: {
              itemId: item.id,
              newQuantity: value,
              type: GROUP_TYPES.MULTIPLE,
              groupPath,
            },
          })
        }}
      />
    </div>
  )
}

const Quantity: FC = () => {
  const { groupType } = useProductAssemblyItem()

  if (groupType === 'SINGLE') {
    return <Single />
  }
  if (groupType === 'TOGGLE') {
    return <Toggle />
  }
  return <Multiple />
}

export default Quantity
