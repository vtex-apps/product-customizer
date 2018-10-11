
/**
* @class' ProductCustomizerService
* @description Handle all business rules from ProductCustomizer Component.
*/
class ProductCustomizerService {
  constructor(schema) {
    this.schema = schema
    this.items = schema.items
    this.properties = schema.properties

    console.log(this.schema)
  }

  /**
  * serialize
  * Serialize schemas data to component pattern.
  * @return Object
  */
  serialize() {
    const requiredVariations = this.parseRequiredVariations()

    return { requiredVariations }
  }

  /**
  * parseToppingsProperties
  * Fetch an array of optional variations.
  * @return array
  */
  parseOptionalVariations() {
    //
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
      return this.properties[property].enum.map(id => {
        return this.items.find(item => {
          return item.id === id
        })
      })
    })
  }

  /**
  * getEnumsByProperty
  * Get enumerable values by property type.
  * @param object property
  * @return mixed
  */
  getEnumsByProperty(property) {
    return this.properties[property].items
  }

  /**
  * enumHasItem
  * Check if enumerable passed has items in  schema.
  * @param object enumerable
  * @return boolean
  */
  enumHasItem(enumerable) {
    let response = false

    this.items.forEach(item => {
      if (enumerable !== item.id) {
        return true
      }

      response = true
    })

    return response
  }

  /**
  * getItemByEnumerable
  * Get equivalent item of enumerable.
  * @param object enumerable
  * @return object
  */
  getItemByEnumerable(enumerable) {
    return this.items.find(item => enumerable === item.id)
  }

  /**
  * getProperty
  * Get property value from index name.
  * @param string index
  * @return object
  */
  getProperty(index) {
    return this.properties[index]
  }
}

export default ProductCustomizerService
