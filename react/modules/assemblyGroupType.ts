import { propEq } from 'ramda'

const maxIsOne = propEq('maxQuantity', 1)

export const GROUP_TYPES: Record<string, GroupTypes> = {
  SINGLE: 'SINGLE',
  TOGGLE: 'TOGGLE',
  MULTIPLE: 'MULTIPLE',
}

export const getGroupType = (assemblyOption: AssemblyOption): GroupTypes => {
  const compositionMinQuantity = assemblyOption.composition?.minQuantity ?? 0
  const compositionMaxQuantity = assemblyOption.composition?.maxQuantity ?? 0

  if (compositionMinQuantity === 1 && compositionMaxQuantity === 1) {
    return GROUP_TYPES.SINGLE
  }

  if (assemblyOption.composition?.items.every(maxIsOne)) {
    return GROUP_TYPES.TOGGLE
  }

  return GROUP_TYPES.MULTIPLE
}
