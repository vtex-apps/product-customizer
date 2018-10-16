
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

  createAttachmentStringBySelections(state) {
    const {
      extraVariations,
      selectedVariation: {
        variation,
      },
      compositionVariations,
      chosenAmountBasic
    } = state

    const selectedVariationString = `[1-1]#${variation.id}[${variation.minQuantity}-${variation.maxQuantity}][1]`
    const extraVariationsString = extraVariations.map(item => {
      return `[${item.minTotalItems}-${item.maxTotalItems}]#${item.variation.id}[${item.variation.minQuantity}-${item.variation.maxQuantity}][${item.quantity}]`
    }).join(';')
    const compositionVariationsString = Object.entries(chosenAmountBasic).reduce((acc, [key, value]) => {
      if (value<1) return acc
      const array = [...acc]
      const variation = compositionVariations.variations.find(item => item.name === key)
      array.push( `[${compositionVariations.maxTotalItems}-${compositionVariations.minTotalItems}]#${variation.id}[${variation.minQuantity}-${variation.maxQuantity}][${value}]`)
      return array
    }, []).join(`;`)

    return {
      selectedVariationString,
      extraVariationsString,
      compositionVariationsString,
    }
  }
}

export default ProductCustomizerService
