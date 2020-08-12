import { Product } from 'vtex.product-context/useProduct'

export const itemMetadata: Product['itemMetadata'] = {
  items: [
    {
      id: '2000584',
      name: 'Custom Bell Gold Bell',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155545/gold_bell.jpg?v=637020789145570000',
      seller: '1',
      assemblyOptions: [
        {
          id: 'add-on_Add-on',
          name: 'add-on',
          required: true,
          inputValues: [],
          composition: {
            minQuantity: 0,
            maxQuantity: 3,
            items: [
              {
                id: '2000588',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
              {
                id: '2000589',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
              {
                id: '2000590',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
            ],
          },
        },
        {
          id: 'text_style_Text Style',
          name: 'text_style',
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
                seller: '1',
                initialQuantity: 1,
              },
              {
                id: '2000592',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
            ],
          },
        },
        {
          id: 'engraving_Engraving',
          name: 'engraving',
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
                seller: '1',
                initialQuantity: 0,
              },
              {
                id: '2000587',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
            ],
          },
        },
      ],
    },
    {
      id: '2000588',
      name: 'Bells add-ons Logo small',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155549/logo-bell.jpg?v=637020801573330000',
      seller: '1',
      assemblyOptions: [],
    },
    {
      id: '2000589',
      name: 'Bells add-ons Logo big',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155549/logo-bell.jpg?v=637020801573330000',
      seller: '1',
      assemblyOptions: [],
    },
    {
      id: '2000590',
      name: 'Bells add-ons Plaque',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155550/Plaque.jpg?v=637020802611500000',
      seller: '1',
      assemblyOptions: [],
    },
    {
      id: '2000591',
      name: 'Bells add-ons Roman',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155551/roman.png?v=637020804802370000',
      seller: '1',
      assemblyOptions: [],
    },
    {
      id: '2000592',
      name: 'Bells add-ons Script',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155551/roman.png?v=637020804802370000',
      seller: '1',
      assemblyOptions: [],
    },
    {
      id: '2000586',
      name: 'Bells add-ons 1-3 lines',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155547/3-lins.jpg?v=637020796905600000',
      seller: '1',
      assemblyOptions: [
        {
          id: '1-3-lines',
          name: '1-3-lines',
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
    {
      id: '2000587',
      name: 'Bells add-ons 4 lines',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155548/3-lins.jpg?v=637020800571470000',
      seller: '1',
      assemblyOptions: [
        {
          id: '4-lines',
          name: '4-lines',
          required: true,
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
            {
              label: 'Line 4',
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
    {
      id: '2000585',
      name: 'Custom Bell Silver Bell',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155546/silver_bell.jpg?v=637020789985930000',
      seller: '1',
      assemblyOptions: [
        {
          id: 'add-on_Add-on',
          name: 'add-on',
          required: true,
          inputValues: [],
          composition: {
            minQuantity: 0,
            maxQuantity: 3,
            items: [
              {
                id: '2000588',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
              {
                id: '2000589',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
              {
                id: '2000590',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
            ],
          },
        },
        {
          id: 'text_style_Text Style',
          name: 'text_style',
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
                seller: '1',
                initialQuantity: 1,
              },
              {
                id: '2000592',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
            ],
          },
        },
        {
          id: 'engraving_Engraving',
          name: 'engraving',
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
                seller: '1',
                initialQuantity: 0,
              },
              {
                id: '2000587',
                minQuantity: 0,
                maxQuantity: 1,
                priceTable: 'vip',
                seller: '1',
                initialQuantity: 0,
              },
            ],
          },
        },
      ],
    },
    {
      id: '310124174',
      name: 'Custom Bell Pink Bell',
      imageUrl:
        'https://storecomponents.vtexassets.com/arquivos/ids/155629/PINK.jpg?v=637249131334400000',
      seller: '1',
      assemblyOptions: [
        {
          id: 'Assembly_testCarla',
          name: 'Assembly',
          required: false,
          inputValues: [],
          composition: {
            minQuantity: 1,
            maxQuantity: 1,
            items: [
              {
                id: '2000589',
                minQuantity: 1,
                maxQuantity: 1,
                priceTable: '',
                seller: '1',
                initialQuantity: 1,
              },
            ],
          },
        },
      ],
    },
  ],
  priceTable: [
    {
      type: 'vip',
      values: [
        {
          id: '2000588',
          assemblyId: 'add-on_Add-on',
          price: 7500,
        },
        {
          id: '2000589',
          assemblyId: 'add-on_Add-on',
          price: 9000,
        },
        {
          id: '2000590',
          assemblyId: 'add-on_Add-on',
          price: 6000,
        },
        {
          id: '2000591',
          assemblyId: 'text_style_Text Style',
          price: 0,
        },
        {
          id: '2000592',
          assemblyId: 'text_style_Text Style',
          price: 1500,
        },
        {
          id: '2000586',
          assemblyId: 'engraving_Engraving',
          price: 2600,
        },
        {
          id: '2000587',
          assemblyId: 'engraving_Engraving',
          price: 3000,
        },
        {
          id: '2000588',
          assemblyId: 'add-on_Add-on',
          price: 7500,
        },
        {
          id: '2000589',
          assemblyId: 'add-on_Add-on',
          price: 9000,
        },
        {
          id: '2000590',
          assemblyId: 'add-on_Add-on',
          price: 6000,
        },
        {
          id: '2000591',
          assemblyId: 'text_style_Text Style',
          price: 0,
        },
        {
          id: '2000592',
          assemblyId: 'text_style_Text Style',
          price: 1500,
        },
        {
          id: '2000586',
          assemblyId: 'engraving_Engraving',
          price: 2600,
        },
        {
          id: '2000587',
          assemblyId: 'engraving_Engraving',
          price: 3000,
        },
      ],
    },
    {
      type: '',
      values: [
        {
          id: '2000589',
          assemblyId: 'Assembly_testCarla',
          price: 9000,
        },
      ],
    },
  ],
}
