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

  if (assemblyOption.composition.items.every((item) => item.maxQuantity === 1)) {
    return GROUP_TYPES.TOGGLE
  }

  return GROUP_TYPES.MULTIPLE
}