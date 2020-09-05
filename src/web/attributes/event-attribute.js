import { resolveVariable, setVariable } from '../components/helper'
import Expression from '../../framework/expression'

class EventAttribute {
  constructor(name, attr, element) {
    this.name = name
    this.attr = attr
    this.element = element
    this.expression = new Expression(this.attr.value, resolveVariable, setVariable)

    this.element.addEventListener(this.name, (_) => {
      this.expression.evaluate()
    })
  }

  render() {
    /* Do nothing */
  }
}

export default EventAttribute
