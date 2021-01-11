import { baseOptions } from './__fixtures__/options'
import { createState } from './AssemblyStateContext'

test('should generate the initial state', () => {
  const productId = '2000584'
  const initialState = createState({ productId, options: baseOptions })

  expect(initialState).toMatchInlineSnapshot(`
    Map {
      Array [
        "2000584",
        "add-on_Add-on",
      ] => Object {
        "assemblyPath": Array [
          "2000584",
          "add-on_Add-on",
        ],
        "inputValues": Object {},
        "optin": true,
        "productId": "2000584",
        "selectedItems": Array [],
        "totalQuantitySelected": 0,
      },
      Array [
        "2000584",
        "text_style_Text Style",
      ] => Object {
        "assemblyPath": Array [
          "2000584",
          "text_style_Text Style",
        ],
        "inputValues": Object {},
        "optin": true,
        "productId": "2000584",
        "selectedItems": Array [
          Object {
            "id": "2000591",
            "quantity": 1,
          },
        ],
        "totalQuantitySelected": 1,
      },
      Array [
        "2000584",
        "engraving_Engraving",
      ] => Object {
        "assemblyPath": Array [
          "2000584",
          "engraving_Engraving",
        ],
        "inputValues": Object {},
        "optin": true,
        "productId": "2000584",
        "selectedItems": Array [],
        "totalQuantitySelected": 0,
      },
      Array [
        "2000584",
        "engraving_Engraving",
        "2000586",
        "1-3-lines",
      ] => Object {
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
        "productId": "2000586",
        "selectedItems": Array [],
        "totalQuantitySelected": 0,
      },
    }
  `)
})
