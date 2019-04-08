import React from 'react'

export const Spinner = () => <div>Spinner</div>

export const withToast = Comp => props => <Comp {...props} />

export const Checkbox = (props) => <div>{`Checkbox props=${JSON.stringify(props)}`}</div>