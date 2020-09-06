import { resolveVariable, setVariable } from '../components/helper'
import Expression from '../../framework/expression'
import ExpressionContext from '../../framework/expression-context'

class EventAttribute {
  constructor(name, attr, element) {
    this.name = name
    this.attr = attr
    this.element = element
    this.expression = new Expression(this.attr.value)

    this.element.addEventListener(this.name, (event) => {
      const eventValue = event.currentTarget.value
      const context = new ExpressionContext(resolveVariable, setVariable)
      context.addExtraState({ event: { value: eventValue  } })

      this.expression.evaluate(context)
    })
  }

  render() {
    /* Do nothing */
  }
}

export default EventAttribute
