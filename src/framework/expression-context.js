import { get, merge } from 'lodash/object'

class ExpressionContext {
  constructor(componentContext) {
    this.componentContext = componentContext
    this.extraState = {}
  }

  resolveVariable(name) {
    let resolvedVariable = this.resolveFromExtraState(name)

    if (!resolvedVariable) {
      resolvedVariable = this.componentContext.resolveVariable(name)
    }

    return resolvedVariable
  }

  setVariable(name, value) {
    this.componentContext.setVariable(name, value)
  }

  addExtraState(state) {
    this.extraState = merge(this.extraState, state)
  }

  resolveFromExtraState(name) {
    return get(this.extraState, name)
  }

  callFunction(name, args) {
    return this.componentContext.callFunction(name, args)
  }
}

export default ExpressionContext
