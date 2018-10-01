class ProductCustomizerService {
  constructor(schema) {
    this.schema = schema
    this.items = schema.items
    this.properties = schema.properties
  }

  serializeData() {
    this.parseProperties()

    return Object.keys(this.getProperties()).map(index => {
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

  parseProperties() {
    const properties = this.getProperties()

    for (const property of Object.keys(properties)) {
      const parsedItems = []
      const options = this.getEnums(property)

      this.getProperty(property)['required'] = this.isPropertyRequired(property)
      if (!options) {
        continue
      }

      options.forEach(enumerable => {
        if (this.enumHasItem(enumerable)) {
          parsedItems.push(this.getItemByEnumerable(enumerable))
          this.getProperty(property)['choiceType'] = 'single'
          return true
        }

        parsedItems.push(enumerable)
        this.getProperty(property)['choiceType'] = 'multiple'
      })

      this.getProperty(property)['items'] = parsedItems
    }
  }

  getEnums(property) {
    if (this.properties[property].type === 'string') {
      return this.properties[property].enum
    }

    if (this.properties[property].type === 'array') {
      return this.properties[property].items.enum
    }
  }

  isPropertyRequired(property) {
    return this.getRequiredProperties().indexOf(property) !== -1
  }

  enumHasItem(enumerable) {
    let response = false

    this.getItems().forEach(item => {
      if (enumerable !== item.Id) {
        return true
      }
      response = true
    })

    return response
  }

  getItemByEnumerable(enumerable) {
    const items = this.getItems().find(item => {
      return enumerable === item.Id
    })

    return items
  }

  getSchema() {
    return this.schema
  }

  getProperty(index) {
    return this.properties[index]
  }

  getItems() {
    return this.items
  }

  getProperties() {
    return this.properties
  }

  getRequiredProperties() {
    return this.getSchema().required
  }
}

export default ProductCustomizerService
