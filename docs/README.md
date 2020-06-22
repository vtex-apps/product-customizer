📢 Use this project, [contribute](https://github.com/vtex-apps/product-customizer) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).
    
# Product Customizer

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Product Customizer allows a product's [attachments](https://help.vtex.com/tutorial/o-que-e-um-anexo--aGICk0RVbqKg6GYmQcWUm) to be made available and ready to be chosen by users from the product page. 

![attachment-product-customization-select](https://user-images.githubusercontent.com/52087100/65711995-707f6e00-e06c-11e9-8faa-43aecfed3e51.png)

## Configuration 

1. Add `product-customizer` app to your theme's dependencies in the `manifest.json`, for example:

```diff
  dependencies: {
+   "vtex.product-customizer": "2.x"
}
```

Now, you are able to use all blocks exported by the `product-customizer` app. Check out the full list below:

| Block name     | Description                                     |
| -------------- | ----------------------------------------------- |
| `product-assembly-options` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red)  Top level block in which you will specify which entity and schema from Master Data will be used for building the form. It provides context to all its 8 children blocks (listed below).   |
| `assembly-option-item-image` | 
| `assembly-option-item-quantity-selector` | 
| `assembly-option-item-name` |
| `assembly-option-item-price` | 
| `assembly-option-item-customize` |
| `assembly-option-item-children-description` | 
| `assembly-option-input-values` | Renders a checkbox field in the form. |

2. In the theme's product template (`store.product`), add the `product-assembly-options` block, exported by the Product Customizer app, and declare the `assembly-option-input-values` block as its child:

```json
  "product-assembly-options": {
    "children": [
      "assembly-option-input-values"
    ]
  },
````

3. Then, declare the props according to your store's scenario. For example:

```json
  "product-assembly-options": {
    "children": [
      "assembly-option-input-values"
    ]
  },
  "assembly-option-input-values": {
    "props": {
      "optionsDisplay": "box"
    }
  }
```

### `assembly-option-input-values` props

| Prop name | Type | Description | Default value |
|--------------|--------|--------------| --------|
| `initiallyOpened` | `enum` | By default, the customization box is opened if the attachment is required and closed if it's not. You can override this behavior by setting this prop to `always`, making it be opened even if the attachment is not required. Leave it as `required` for the default behavior. | `required` |
| `optionsDisplay` | `enum` | Define whether the attachment's pre-defined options will be displayed to be selected in a Checkbox (`box`) or in a dropdown list (`select`) . | `select` |

## Modus Operandi

According to the [data entry](https://help.vtex.com/tutorial/adding-an-attachment?locale=en) in the catalog, the Product Customizer takes 3 types of attachments into account when being rendered:

-  **Free text** - Any text can be entered in this field. Users may or may not have a character limit, depending on what was filled in the `Maximum Number of Characters` field in the attachment register.
  - **Predefined options**  - Users can only choose between an attachment's predefined options, according to what's set in the `Permitted Values` field in the attachment register. The way these options will be displayed can be defined with the `optionsDisplay` prop from `assembly-option-input-values` block.
 -  **Boolean** -  If the options that are predefined in the `Permitted Values` field are either `true` ou `false`, users can choose the attachment by simply clicking on a checkbox.
 
Notice the example below and check out the three attachment types simultaneously displayed for the same product:

![product-customizer-select](https://user-images.githubusercontent.com/52087100/65720836-32d81080-e07f-11e9-9782-0f5a2e6934f0.png)

Then, check out below how the product attachment displayed above was registered in the admin's Catalog: 

![attachment-product-customizer](https://user-images.githubusercontent.com/52087100/65720878-471c0d80-e07f-11e9-8267-27c35fb4c6b4.png)

:information_source: Notice that **when a product's attachment was registered as required, all attachment options will be automatically made available to users**. If the product's attachment is not added as required, the `Add customization` button is rendered, as shown in the example above, giving users the options to add or not to add an attachment to their product.

:warning: The Product Customizer uses the new Assembly Options API (the traditional Attachments API will be discontinued).  As a result, **Checkout still doesn't natively render the customized product option previously selected by the user in the product page**. For the product to be correctly displayed with the chosen attachment, it's necessary for now to customize the Checkout page interface for it to read the product data in its context and render it.

## Customization

No CSS Handles are available yet for the app customization.

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/leoWorkingGood"><img src="https://avatars2.githubusercontent.com/u/51805410?v=4" width="100px;" alt=""/><br /><sub><b>leoWorkingGood</b></sub></a><br /><a href="https://github.com/vtex-apps/product-customizer/commits?author=leoWorkingGood" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

