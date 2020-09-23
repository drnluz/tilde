import EventAttribute from './event-attribute'
import Attribute from './attribute'

class AttributesBuilder {
  static build(attr, element, componentContext) {
    if (attr.name.startsWith('~') || attr.name.startsWith('data-tilde-')) {
      const attributeName = attr.name.replace('~', '').replace('data-tilde-', '')

      if (this.EVENTNAMES.includes(attributeName)) {
        return new EventAttribute(attributeName, attr, element, componentContext)
      }
      else {
        return new Attribute(attributeName, attr, element, componentContext)
      }
    }
  }

  static get EVENTNAMES() {
    return ['click', 'change']
  }
}

export default AttributesBuilder
