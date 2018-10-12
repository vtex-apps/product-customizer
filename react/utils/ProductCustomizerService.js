
/**
* @class' ProductCustomizerService
* @description Handle parsers from ProductCustomizer Component.
*/
class ProductCustomizerService {
  constructor(schema) {
    if (!schema) {
      return false
    }

    this.schema = schema
    this.items = schema.items
    this.properties = schema.properties
    console.log(schema)
  }

  /**
  * parseToppingsProperties
  * Fetch an array of optional variations.
  * @return array
  */
  parseOptionalVariations() {
    return Object.keys(this.properties).filter(property => {
      return this.properties[property].type === 'array'
    }).reduce((accumulator, property) => {
      return {
        minTotalItems: this.properties[property].minTotalItems,
        maxTotalItems: this.properties[property].maxTotalItems,
        variations: this.items[property],
      }
    }, [])
  }

  /**
  * parseRequiredVariations
  * Fetch an array of required variations.
  * @return array
  */
  parseRequiredVariations() {
    return Object.keys(this.properties).filter(property => {
      return this.properties[property].type === 'string'
    }).reduce((accumulator, property) => {
      return this.items[property]
    }, [])
  }

  /**
  * getBasicCompositionBySku
  * Fetch an array of required variations.
  * @return array
  */
  getBasicCompositionBySku() {
    return Object.keys(this.properties).filter(property => {
      return this.properties[property].type === 'array' && this.properties[property].minTotalItems === '1'
    }).reduce((accumulator, property) => {
      return {
        minTotalItems: this.properties[property].minTotalItems,
        maxTotalItems: this.properties[property].maxTotalItems,
        variations: this.items[property],
      }
    }, [])
  }

  updateAttachmentStringBySelections(state) {
    const {
      extraVariations,
      selectedVariation: {
        variation,
      },
      compositionVariations,
    } = state

    const selectedVariationString = `[1-1]#${variation.id}[${variation.minQuantity}-${variation.maxQuantity}][1]`
    const extraVariationsString = extraVariations.map(item => {
      return `[${item.minTotalItems}-${item.maxTotalItems}]#${item.variation.id}[${item.variation.minQuantity}-${item.variation.maxQuantity}][${item.quantity}]`
    }).join(';')
    const compositionVariationsString = compositionVariations.variations.map(item => {
      return `[${compositionVariations.maxTotalItems}-${compositionVariations.minTotalItems}]#${item.id}[${item.minQuantity}-${item.maxQuantity}][${item.defaultQuantity}]`
    }).join(';')

    console.log('selectedVariationString', selectedVariationString)
    console.log('extraVariationsString', extraVariationsString)
    console.log('compositionVariationsString', compositionVariationsString)
  }
}

export default ProductCustomizerService
