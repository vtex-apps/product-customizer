import React, { FC } from 'react'
import { render } from '@vtex/test-tools/react'

const baseOptions: AssemblyGeneralState['options'] = {
  '2000584': {
    id: '2000584',
    seller: '1',
    options: [
      {
        id: 'add-on_Add-on',
        name: 'add-on',
        type: 'MULTIPLE',
        inputValues: [],
        required: true,
        composition: {
          minQuantity: 0,
          maxQuantity: 3,
          items: [
            {
              id: '2000590',
              minQuantity: 0,
              maxQuantity: 1,
              priceTable: 'vip',
              price: 6000,
              seller: '1',
              initialQuantity: 0,
            },
            {
              id: '2000589',
              minQuantity: 0,
              maxQuantity: 1,
              priceTable: 'vip',
              price: 9000,
              seller: '1',
              initialQuantity: 0,
            },
            {
              id: '2000590',
              minQuantity: 0,
              maxQuantity: 1,
              priceTable: 'vip',
              price: 6000,
              seller: '1',
              initialQuantity: 0,
            },
          ],
        },
      },
      {
        id: 'text_style_Text Style',
        name: 'text_style',
        type: 'SINGLE',
        required: true,
        inputValues: [],
        composition: {
          minQuantity: 1,
          maxQuantity: 1,
          items: [
            {
              id: '2000591',
              minQuantity: 0,
              maxQuantity: 1,
              priceTable: 'vip',
              price: 0,
              seller: '1',
              initialQuantity: 1,
            },
            {
              id: '2000592',
              minQuantity: 0,
              maxQuantity: 1,
              priceTable: 'vip',
              price: 1500,
              seller: '1',
              initialQuantity: 0,
            },
          ],
        },
      },
      {
        id: 'engraving_Engraving',
        name: 'engraving',
        type: 'TOGGLE',
        required: true,
        inputValues: [],
        composition: {
          minQuantity: 0,
          maxQuantity: 1,
          items: [
            {
              id: '2000586',
              minQuantity: 0,
              maxQuantity: 1,
              priceTable: 'vip',
              price: 2600,
              seller: '1',
              initialQuantity: 0,
            },
            {
              id: '2000587',
              minQuantity: 0,
              maxQuantity: 1,
              priceTable: 'vip',
              price: 3000,
              seller: '1',
              initialQuantity: 0,
            },
          ],
        },
      },
    ],
  },
  '2000587': {
    id: '2000587',
    seller: '1',
    options: [],
  },
  '2000592': {
    id: '2000592',
    seller: '1',
    options: [],
  },
  '2000591': {
    id: '2000591',
    seller: '1',
    options: [],
  },
  '2000590': {
    id: '2000590',
    seller: '1',
    options: [],
  },
  '2000589': {
    id: '2000590',
    seller: '1',
    options: [],
  },
  '2000586': {
    id: '2000586',
    seller: '1',
    options: [
      {
        id: '1-3-lines',
        name: '1-3-lines',
        type: 'MULTIPLE',
        required: false,
        inputValues: [
          {
            label: 'Line 1',
            maxLength: 200,
            type: 'TEXT',
            domain: null,
            defaultValue: '',
          },
          {
            label: 'Line 2',
            maxLength: 200,
            type: 'TEXT',
            domain: null,
            defaultValue: '',
          },
          {
            label: 'Line 3',
            maxLength: 200,
            type: 'TEXT',
            domain: null,
            defaultValue: '',
          },
        ],
        composition: null,
      },
    ],
  },
}

function createAssemblyState(
  path: string[],
  option: AssemblyOptionGroup
): AssemblyState {
  let totalQuantitySelected = 0
  const selectedItems: SelectedAssemblyItems[] = []
  if (option.composition) {
    for (const item of option.composition.items) {
      if (item.initialQuantity === 0) continue

      selectedItems.push({
        id: item.id,
        quantity: item.initialQuantity,
      })

      totalQuantitySelected += item.initialQuantity
    }
  }

  const inputValues: AssemblyState['inputValues'] = {}
  if (option.inputValues?.length > 0) {
    for (const inputValue of option.inputValues) {
      inputValues[inputValue.label] = inputValue.defaultValue
        ? inputValue.defaultValue
        : ''
    }
  }

  return {
    assemblyPath: path,

    totalQuantitySelected,
    selectedItems,

    inputValues,
    optin: option.required,
  }
}

function createItemAssemblyOptionsState(
  productId: string,
  path: string[],
  allItems: AssemblyGeneralState['options']
): AssemblyState[] {
  const product = allItems[productId]
  const states: AssemblyState[] = []

  for (const option of product.options) {
    // Create a state for each option of the item
    const optionPath = [...path, productId, option.id]
    const optionState = createAssemblyState(optionPath, option)
    states.push(optionState)

    if (!option.composition) {
      continue
    }

    // Recurse in the items of the items
    for (const item of option.composition.items) {
      states.push(
        ...createItemAssemblyOptionsState(item.id, optionPath, allItems)
      )
    }
  }

  return states
}

function createState(
  productId: string,
  options: AssemblyGeneralState['options']
): AssemblyGeneralState {
  const initialState = createItemAssemblyOptionsState(productId, [], options)

  const assembly = initialState.reduce((acc, state) => {
    acc.set(state.assemblyPath, state)
    return acc
  }, new Map())

  return {
    options,
    assembly,
  }
}

test('should generate the initial state', () => {
  const productId = '2000584'
  const initialState = createItemAssemblyOptionsState(
    productId,
    [],
    baseOptions
  )

  expect(initialState).toMatchInlineSnapshot(`
    Array [
      Object {
        "assemblyPath": Array [
          "2000584",
          "add-on_Add-on",
        ],
        "inputValues": Object {},
        "optin": true,
        "selectedItems": Array [],
        "totalQuantitySelected": 0,
      },
      Object {
        "assemblyPath": Array [
          "2000584",
          "text_style_Text Style",
        ],
        "inputValues": Object {},
        "optin": true,
        "selectedItems": Array [
          Object {
            "id": "2000591",
            "quantity": 1,
          },
        ],
        "totalQuantitySelected": 1,
      },
      Object {
        "assemblyPath": Array [
          "2000584",
          "engraving_Engraving",
        ],
        "inputValues": Object {},
        "optin": true,
        "selectedItems": Array [],
        "totalQuantitySelected": 0,
      },
      Object {
        "assemblyPath": Array [
          "2000584",
          "engraving_Engraving",
          "2000586",
          "1-3-lines",
        ],
        "inputValues": Object {
          "Line 1": "",
          "Line 2": "",
          "Line 3": "",
        },
        "optin": false,
        "selectedItems": Array [],
        "totalQuantitySelected": 0,
      },
    ]
  `)
})

interface ItemAssemblyOptionsProps {
  itemAssembly: ItemAssembly
  assemblyPath: string[]
  state: AssemblyGeneralState
}

const ItemAssemblyOptions: FC<ItemAssemblyOptionsProps> = ({
  itemAssembly,
  assemblyPath,
  state,
}) => {
  return (
    <>
      {itemAssembly.options.map((option, index) => (
        <div key={index}>
          {option.name}

          {option.composition?.items.map((item, itemIndex) => (
            <div key={itemIndex}>
              {item.id}

              <ItemAssemblyOptions
                key={itemIndex}
                itemAssembly={state.options[item.id]}
                assemblyPath={[...assemblyPath, option.id, item.id]}
                state={state}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

test('should render each group', () => {
  const productId = '2000584'
  const state = createState(productId, baseOptions)
  const itemAssembly = state.options[productId]
  const assemblyPath = [productId]

  const { debug } = render(
    <ItemAssemblyOptions
      assemblyPath={assemblyPath}
      itemAssembly={itemAssembly}
      state={state}
    />
  )

  debug()

  expect(true).toBe(true)
})
