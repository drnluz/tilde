import Expression from '../../framework/expression'
import ExpressionContext from '../../framework/expression-context'

class Attribute {
  constructor(name, attr, element, elementContext) {
    this.name = name
    this.attr = attr
    this.element = element
    this.elementContext = elementContext
    this.expression = new Expression(this.attr.value)

    this.expression.variables.forEach((variableName) => {
      this.setupVariableChangeListener(variableName)
    })
  }

  setupVariableChangeListener(variableName) {
    const state = this.elementContext.findState(variableName)
    state.on('change', () => this.render())
  }

  render() {
    const context = new ExpressionContext(this.elementContext)
    const result = this.expression.evaluate(context)

    switch(this.name) {
      case 'value':
        this.element.value = result
        break
      case 'innerhtml':
        this.element.innerHTML = result
        break
      case 'checked':
        result ? this.element.setAttribute(this.name, result) : this.element.removeAttribute(this.name)
        break
      default:
        this.element.setAttribute(this.name, result)
    }
  }

  isEventListener() {
    return false
  }
}

export default Attribute
