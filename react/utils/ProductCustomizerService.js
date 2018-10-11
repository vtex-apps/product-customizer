
/**
* @class' ProductCustomizerService
* @description Handle parsers from ProductCustomizer Component.
*/
class ProductCustomizerService {
  constructor(schema) {
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
      return this.items[property]
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
      return this.items[property]
    }, [])
  }
}

export default ProductCustomizerService
