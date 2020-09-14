import { get, merge } from 'lodash/object'

class ExpressionContext {
  constructor(elementContext) {
    this.elementContext = elementContext
    this.extraState = {}
  }

  resolveVariable(name) {
    let resolvedVariable = this.resolveFromExtraState(name)

    if (!resolvedVariable) {
      resolvedVariable = this.elementContext.resolveVariable(name)
    }

    return resolvedVariable
  }

  setVariable(name, value) {
    this.elementContext.setVariable(name, value)
  }

  addExtraState(state) {
    this.extraState = merge(this.extraState, state)
  }

  resolveFromExtraState(name) {
    return get(this.extraState, name)
  }

  callFunction(name, args) {
    return this.elementContext.callFunction(name, args)
  }
}

export default ExpressionContext
