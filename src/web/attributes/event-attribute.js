import Expression from '../../framework/expression'
import ExpressionContext from '../../framework/expression-context'

class EventAttribute {
  constructor(name, attr, element, componentContext) {
    this.name = name
    this.attr = attr
    this.element = element
    this.componentContext = componentContext
    this.expressions = this.attr.value.split(';').map((expr) => new Expression(expr))

    this.element.addEventListener(this.name, (event) => {
      const eventValue = event.currentTarget.value
      this.render({ event: { value: eventValue  } })
    })
  }

  render(extraState) {
    const context = new ExpressionContext(this.componentContext)
    context.addExtraState(extraState)

    this.expressions.forEach((expression) => {
      expression.evaluate(context)
    })
  }

  isEventListener() {
    return true
  }
}

export default EventAttribute
