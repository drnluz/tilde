import GenericComponent from './generic-component'
import ForComponent from './for-component'
import ComponentContext from './component-context'

class ComponentBuilder {
  static build(element, context) {
    const parentContext = context || new ComponentContext(element)

    if (this.hasForAttribute(element)) {
      return new ForComponent(element, parentContext)
    }
    return new GenericComponent(element, parentContext)
  }

  static hasForAttribute(element) {
    return !!(element.attributes['~for'] || element.attributes['data-tilde-for'])
  }
}

export default ComponentBuilder
