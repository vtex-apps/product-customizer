
/**
* @class' ProductCustomizerService
* @description Handle all business rules from ProductCustomizer Component.
*/
class ProductCustomizerService {
  constructor(schema) {
    this.schema = schema
    this.items = schema.items
    this.properties = schema.properties
  }

  /**
  * serializeData
  * Serialize schema data to component pattern.
  * @return Object
  */
  serializeData() {
    this.parseProperties()

    return Object.keys(this.properties).map(index => {
      const property = this.getProperty(index)

      return {
        option: index,
        choiceType: property.choiceType,
        description: property.description,
        items: property.items,
        minItems: property.minItems,
        maxItems: property.maxItems,
        required: property.required,
        uniqueItems: property.uniqueItems,
      }
    })
  }

  /**
  * parseProperties
  * Populates property fields with required values.
  * @return void
  */
  parseProperties() {
    const properties = this.properties

    for (const property of Object.keys(properties)) {
      const parsedItems = []
      const options = this.getEnumsByProperty(property)

      this.getProperty(property)['required'] = this.isPropertyRequired(property)
      if (!options) {
        continue
      }

      options.forEach(enumerable => {
        this.getProperty(property)['choiceType'] = 'single'

        if (!this.getProperty(property)['required']) {
          this.getProperty(property)['choiceType'] = 'multiple'
        }

        if (this.enumHasItem(enumerable)) {
          return parsedItems.push(this.getItemByEnumerable(enumerable))
        }

        parsedItems.push(enumerable)
      })

      this.getProperty(property)['items'] = parsedItems
    }
  }

  /**
  * getEnumsByProperty
  * Get enumerable values by property type.
  * @param object property
  * @return mixed
  */
  getEnumsByProperty(property) {
    if (this.properties[property].type === 'string') {
      return this.properties[property].enum
    }

    if (this.properties[property].type === 'array') {
      return this.properties[property].items.enum
    }
  }

  /**
  * isPropertyRequired
  * Check if property passed is a required option.
  * @param object property
  * @return boolean
  */
  isPropertyRequired(property) {
    return this.getRequiredProperties().indexOf(property) !== -1
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
      if (enumerable !== item.Id) {
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
    const item = this.items.find(item => {
      return enumerable === item.Id
    })

    return item
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

  /**
  * getRequiredProperties
  * Get an array with required properties.
  * @return array
  */
  getRequiredProperties() {
    return this.schema.required
  }
}

export default ProductCustomizerService
