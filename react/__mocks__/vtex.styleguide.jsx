import React from 'react'
import StyleguideButton from '@vtex/styleguide/lib/Button'
import StyleguideCheckbox from '@vtex/styleguide/lib/Checkbox'
import StyleguideRadio from '@vtex/styleguide/lib/Radio'
import StyleguideNumericStepper from '@vtex/styleguide/lib/NumericStepper'
import StyleguideInput from '@vtex/styleguide/lib/Input'
import StyleguideDropdown from '@vtex/styleguide/lib/Dropdown'
import StyleguideModal from '@vtex/styleguide/lib/Modal'

export const Spinner = () => <div>Spinner</div>

// eslint-disable-next-line react/display-name
export const withToast = (Comp) => (props) => <Comp {...props} />
export const Button = StyleguideButton
export const Checkbox = StyleguideCheckbox
export const Radio = StyleguideRadio
export const NumericStepper = StyleguideNumericStepper
export const Input = StyleguideInput
export const Dropdown = StyleguideDropdown
export const Modal = StyleguideModal
