import React from 'react'

export const Spinner = () => <div>Spinner</div>

// eslint-disable-next-line react/display-name
export const withToast = Comp => props => <Comp {...props} />

import StyleguideButton from '@vtex/styleguide/lib/Button'
export const Button = StyleguideButton

import StyleguideCheckbox from '@vtex/styleguide/lib/Checkbox'
export const Checkbox = StyleguideCheckbox

import StyleguideRadio from '@vtex/styleguide/lib/Radio'
export const Radio = StyleguideRadio

import StyleguideNumericStepper from '@vtex/styleguide/lib/NumericStepper'
export const NumericStepper = StyleguideNumericStepper
