📢 Don't fork this project. Use, contribute or open issues in<a href="https://github.com/vtex-apps/store-discussion"> Store Discussion</a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
    
# Product Customizer

The Product Customizer allows a product's [attachments](https://help.vtex.com/tutorial/o-que-e-um-anexo--aGICk0RVbqKg6GYmQcWUm) to be made available and ready to be chosen by users from the product page. 

![attachment-product-customization-select](https://user-images.githubusercontent.com/52087100/65711995-707f6e00-e06c-11e9-8faa-43aecfed3e51.png)

## Configuration 

1. Add the `product-assembly-options` block to your store's product page template.
2. According to your store's scenario, declare the desired props.

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

| Prop name | Type | Description | Default value |
|--------------|--------|--------------| --------|
| `optionsDisplay` | `string` | You should choose between “box” or “select”. This will define whether the attachment's pre-defined options will be displayed to be selected in a Checkbox (`box`) or a dropdown list (`select`) . | `select` |
| `initiallyOpened` | `enum` | The customization box is opened by default if the attachment is required and closed if it's not required. You can override this behavior by setting this prop to `always` making it be opened even if the attachment is not required. Leave it as `required` for the default behaviour. | `required` |

## Modus Operandi

According to the [data entry](https://help.vtex.com/tutorial/adding-an-attachment?locale=en) in the catalog, the Product Customizer takes 3 types of attachments into account when being rendered:

-  **Free text** - Any text can be entered in this field. Users may or may not have a character limit, depending on what was filled in the `Maximum Number of Characters` field.
  - **Predefined options**  - Users can only choose between an attachment's predefined options, according to what's set in the `Permitted Values` field. The way these options will be displayed can be defined with the `optionsDisplay` prop.
 -  **Boolean** -  If the options that are predefined in the `Permitted Values` field are either `true` ou `false`, users can choose the attachment by simply click on a checkbox.
 
Notice the example below and check out the three attachment types simultaneously displayed for the same product:

![product-customizer-select](https://user-images.githubusercontent.com/52087100/65720836-32d81080-e07f-11e9-9782-0f5a2e6934f0.png)

Then, check out below how the product attachment was registered in the admin's Catalog: 

![attachment-product-customizer](https://user-images.githubusercontent.com/52087100/65720878-471c0d80-e07f-11e9-8267-27c35fb4c6b4.png)

Notice that when a product's attachment was registered as required, all attachment options will be automatically made available to users. If the product's attachment is not added as required, the `Add customization` button is rendered, as shown in the example above, giving users the options to add or not to add an attachment to their product.

<div class="alert alert-warning">
:warning: The Product Customizer uses the new Assembly Options API (the traditional Attachments API will be discontinued).  As a result, Checkout still doesn't natively render the customized product option previously selected by the user in the product page. For the product to be correctly displayed with the chosen attachment, it's necessary for now to customize the Checkout page interface for it to read the product data in its context and render it.
</div>

### Customization

The component still doesn't have CSS Handles for its specific customization.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
