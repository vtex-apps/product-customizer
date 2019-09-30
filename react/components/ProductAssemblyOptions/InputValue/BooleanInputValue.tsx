import React, { FC } from 'react'
import { Checkbox } from 'vtex.styleguide'
import useInputValue, { useInputValueId } from './useInputValue'
import styles from '../styles.css'

const BooleanInputValue: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)
  const id = useInputValueId(inputValueInfo)

  const handleChange = (e: any) => {
    const value = e.target.checked
    onChange({ value })
  }

  return (
    <div className={`${styles.booleanInputValue} mb4`}>
      <Checkbox
        id={id}
        value={inputValueInfo.label}
        checked={Boolean(state)}
        name={inputValueInfo.label}
        label={inputValueInfo.label}
        onChange={handleChange} />
    </div>
  )
}

interface Props {
  inputValueInfo: BooleanInputValue
}

export default BooleanInputValue