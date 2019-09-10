import { propEq } from 'ramda'

const maxIsOne = propEq('maxQuantity', 1)

export enum GROUP_TYPES {
  SINGLE = 'SINGLE',
  TOGGLE = 'TOGGLE',
  MULTIPLE = 'MULTIPLE',
}

export const getGroupType = (assemblyOption: AssemblyOption): GroupTypes => {
  if (!assemblyOption.composition) {
    return GROUP_TYPES.MULTIPLE
  }
  if (assemblyOption.composition.maxQuantity === 1) {
    return GROUP_TYPES.SINGLE
  }

  if (assemblyOption.composition.items.every(maxIsOne)) {
    return GROUP_TYPES.TOGGLE
  }

  return GROUP_TYPES.MULTIPLE
}
