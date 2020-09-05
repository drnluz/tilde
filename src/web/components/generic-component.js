import ComponentBuilder from './component-builder'
import AttributesBuilder from '../attributes/attributes-builder'

class GenericComponent {
  constructor(element) {
    this.element = element
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
      this.children.push(ComponentBuilder.build(child))
    })
  }

  setupTildeAttributes() {
    Array.from(this.element.attributes).forEach((attr) => {
      this.attributes.push(AttributesBuilder.build(attr, this.element))
    })
  }
}

export default GenericComponent
