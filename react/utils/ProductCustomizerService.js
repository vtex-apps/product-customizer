
/**
* @class' ProductCustomizerService
* @description Handle parsers from ProductCustomizer Component.
*/
class ProductCustomizerService {
  constructor(schema) {
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
    }).map(property => {
      return this.properties[property].items.enum
    }).reduce((accumulator, arrayIds) => {
      return arrayIds.map(id => {
        return id
      })
    }).map(item => {
      return this.items.find(entity => {
        return entity.id === item
      })
    })
  }

  /**
  * parseRequiredVariations
  * Fetch an array of required variations.
  * @return array
  */
  parseRequiredVariations() {
    return Object.keys(this.properties).filter(property => {
      return this.properties[property].type === 'string'
    }).map(property => {
      return this.properties[property].enum
    }).reduce((accumulator, arrayIds) => {
      return arrayIds.map(id => {
        return id
      })
    }).map(item => {
      return this.items.find(entity => {
        return entity.id === item
      })
    })
  }
}

export default ProductCustomizerService
