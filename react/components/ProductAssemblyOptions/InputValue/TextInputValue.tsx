import React, { FC } from 'react'
import { Input } from 'vtex.styleguide'
import useInputValue from './useInputValue'
import styles from '../styles.css'

const TextInputValue: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)

  const handleChange = (e: any) => {
    const value = e.target.value
    onChange({ value })
  }

  return (
    <div className={`${styles.textInputValue} mb4`}>
      <Input
        value={state}
        onChange={handleChange}
        label={inputValueInfo.label}
        maxLength={inputValueInfo.maxLength} />
    </div>
  )
}

interface Props {
  inputValueInfo: TextInputValue
}

export default TextInputValue