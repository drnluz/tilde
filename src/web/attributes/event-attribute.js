import { resolveVariable, setVariable, callFunction } from '../components/helper'
import Expression from '../../framework/expression'
import ExpressionContext from '../../framework/expression-context'

class EventAttribute {
  constructor(name, attr, element) {
    this.name = name
    this.attr = attr
    this.element = element
    this.expressions = this.attr.value.split(';').map((expr) => new Expression(expr))

    this.element.addEventListener(this.name, (event) => {
      const eventValue = event.currentTarget.value
      this.render({ event: { value: eventValue  } })
    })
  }

  render(extraState) {
    const context = new ExpressionContext(resolveVariable, setVariable, callFunction)
    context.addExtraState(extraState)

    this.expressions.forEach((expression) => {
      expression.evaluate(context)
    })
  }
}

export default EventAttribute
