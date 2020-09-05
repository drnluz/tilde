import { resolveVariable, setVariable, findState } from '../components/helper'
import Expression from '../../framework/expression'

class Attribute {
  constructor(name, attr, element) {
    this.name = name
    this.attr = attr
    this.element = element
    this.expression = new Expression(this.attr.value, resolveVariable, setVariable)

    this.expression.variables.forEach((variableName) => {
      this.setupVariableChangeListener(variableName)
    })
  }

  setupVariableChangeListener(variableName) {
    const state = findState(variableName)
    state.on('change', () => this.render())
  }

  render() {
    const result = this.expression.evaluate()

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
