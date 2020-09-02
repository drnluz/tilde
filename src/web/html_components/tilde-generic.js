import Expression from '../../framework/expression'
import Tilde from '..'

class TildeGeneric {
  constructor(element) {
    this.element = element
    this.children = []
    this.expressions = []

    this.setupTildeAttributes()
    this.setupChildren()
  }

  setupChildren() {
    if (this.element.childElementCount == 0) {
      return
    }

    Array.from(this.element.children).forEach((child) => {
      this.children.push(new TildeGeneric(child))
    })
  }

  setupTildeAttributes() {
    const attributes = this.element.attributes
    for (var i = 0; i < attributes.length; i++) {
      let attr = attributes[i]
      if (attr.name.startsWith('~') || attr.name.startsWith('data-tilde-')) {
        this.setupTildeAttribute(attr)
      }
    }
  }

  setupTildeAttribute(attr) {
    const attributeName = attr.name.replace('~', '').replace('data-tilde-', '')

    const expression = new Expression(attr.value, this.resolveVariable)
    this.expressions[attr.name] = expression

    expression.variables.forEach((variableName) => {
      this.setupVariableChangeListener(attr.name, variableName)
    })
  }

  resolveVariable(name) {
    return Tilde.findState(name)._value
  }

  setupVariableChangeListener(attributeName, variableName) {
    let state = Tilde.findState(variableName)

    state.on('change', (_, _a) => {
      let originalAttribute = attributeName.replace('~', '')
      let result = this.expressions[attributeName].evaluate()
      this.element.setAttribute(originalAttribute, result)
    })
  }
}

export default TildeGeneric
