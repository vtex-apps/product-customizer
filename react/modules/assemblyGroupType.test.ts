import { getGroupType, GROUP_TYPES } from './assemblyGroupType'

test('getGroupType should return type single', () => {
  const fakeAssemblyOptionGroup = {
    composition: {
      minQuantity: 1,
      maxQuantity: 1,
    },
  } as AssemblyOption

  expect(getGroupType(fakeAssemblyOptionGroup)).toBe(GROUP_TYPES.SINGLE)
})

test('getGroupType should return type toggle', () => {
  const fakeAssemblyOptionGroup = {
    composition: {
      minQuantity: 0,
      maxQuantity: 1,
      items: [
        {
          minQuantity: 0,
          maxQuantity: 1,
        },
        {
          minQuantity: 0,
          maxQuantity: 1,
        },
      ],
    },
  } as AssemblyOption

  expect(getGroupType(fakeAssemblyOptionGroup)).toBe(GROUP_TYPES.TOGGLE)
})

test('getGroupType should return type multiple', () => {
  const fakeAssemblyOptionGroup = {
    composition: {
      minQuantity: 0,
      maxQuantity: 1,
      items: [
        {
          minQuantity: 0,
          maxQuantity: 1,
        },
        {
          minQuantity: 0,
          maxQuantity: 2, // this value will make the getGroupType return type multiple
        },
      ],
    },
  } as AssemblyOption

  expect(getGroupType(fakeAssemblyOptionGroup)).toBe(GROUP_TYPES.MULTIPLE)
})
