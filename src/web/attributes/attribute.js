import { resolveVariable, setVariable, callFunction, findState } from '../components/helper'
import Expression from '../../framework/expression'
import ExpressionContext from '../../framework/expression-context'

class Attribute {
  constructor(name, attr, element) {
    this.name = name
    this.attr = attr
    this.element = element
    this.expression = new Expression(this.attr.value)

    this.expression.variables.forEach((variableName) => {
      this.setupVariableChangeListener(variableName)
    })
  }

  setupVariableChangeListener(variableName) {
    const state = findState(variableName)
    state.on('change', () => this.render())
  }

  render() {
    const context = new ExpressionContext(resolveVariable, setVariable, callFunction)
    const result = this.expression.evaluate(context)

    switch(this.name) {
      case 'value':
        this.element.value = result
        break
      case 'innerhtml':
        this.element.innerHTML = result
        break
      default:
        this.element.setAttribute(originalAttribute, result)
    }
  }
}

export default Attribute
