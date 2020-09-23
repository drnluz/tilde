import ComponentBuilder from './component-builder'
import AttributesBuilder from '../attributes/attributes-builder'
import ComponentContext from './component-context'

class GenericComponent {
  constructor(element, context) {
    this.element = element
    this.context = context || new ComponentContext(this.element)
    this.children = []
    this.attributes = []

    this.setupTildeAttributes()
    this.setupChildren()
  }

  setupChildren() {
    if (this.element.childElementCount == 0) {
      return
    }

    Array.from(this.element.children).forEach((child) => {
      this.children.push(ComponentBuilder.build(child, this.context))
    })
  }

  setupTildeAttributes() {
    Array.from(this.element.attributes).forEach((attr) => {
      let attribute = AttributesBuilder.build(attr, this.element, this.context)

      if (attribute && !attribute.isEventListener()) {
        this.attributes.push(attribute)
        attribute.render()
      }
    })
  }
}

export default GenericComponent
