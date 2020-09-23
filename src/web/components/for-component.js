import ComponentBuilder from './component-builder'
import AttributesBuilder from '../attributes/attributes-builder'
import ComponentContext from './component-context'

class ForComponent {
  constructor(element, context) {
    this.element = element
    this.context = context
    this.components = []
    this.forState = this.findForState()

    this.render()

    this.forState.on('change', () => this.render())
  }

  findForState() {
    const forVariable = this.tildeForAttributeValue()
    return this.context.findState(forVariable)
  }

  render() {
    this.element.hidden = true

    this.components.forEach(component => component.element.remove())
    this.components = []

    this.forState._value.forEach(state => {
      let context = new ComponentContext(state)
      this.renderElement(context)
    })
  }

  renderElement(context) {
    const element = this.element.cloneNode(true)
    element.removeAttribute('~for')
    element.removeAttribute('data-tilde-for')
    element.hidden = false

    this.element.after(element)

    const component = ComponentBuilder.build(element, context)

    this.components.push(component)
  }

  setupChildren() {
    if (this.element.childElementCount == 0) {
      return
    }

    const stateNode = this.context.findState(this.tildeForAttributeValue())
    const childrenContext = new ComponentContext(stateNode)

    Array.from(this.element.children).forEach((child) => {
      this.children.push(ComponentBuilder.build(child, childrenContext))
    })
  }

  setupTildeAttributes() {
    Array.from(this.element.attributes).forEach((attr) => {
      this.attributes.push(AttributesBuilder.build(attr, this.element, this.context))
    })
  }

  tildeForAttributeValue() {
    const attr = this.element.attributes['~for'] || this.element.attributes['data-tilde-for']
    // TODO: Raise nice error with link to docs if ~for is not present
    return attr.value
  }
}

export default ForComponent
