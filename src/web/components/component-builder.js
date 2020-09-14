import GenericComponent from './generic-component'
import ForComponent from './for-component'

class ComponentBuilder {
  static build(element, context) {
    if (this.hasForAttribute(element)) {
      return new ForComponent(element, context)
    }
    return new GenericComponent(element, context)
  }

  static hasForAttribute(element) {
    return !!(element.attributes['~for'] || element.attributes['data-tilde-for'])
  }
}

export default ComponentBuilder
