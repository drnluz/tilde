import { get, merge } from 'lodash/object'

class ExpressionContext {
  constructor(parentContext) {
    this.parentContext = parentContext
    this.extraState = {}
  }

  resolveVariable(name) {
    let resolvedVariable = this.resolveFromExtraState(name)

    if (!resolvedVariable) {
      resolvedVariable = this.parentContext.resolveVariable(name)
    }

    return resolvedVariable
  }

  setVariable(name, value) {
    this.parentContext.setVariable(name, value)
  }

  addExtraState(state) {
    this.extraState = merge(this.extraState, state)
  }

  resolveFromExtraState(name) {
    return get(this.extraState, name)
  }

  callFunction(name, args) {
    return this.parentContext.callFunction(name, args)
  }
}

export default ExpressionContext
