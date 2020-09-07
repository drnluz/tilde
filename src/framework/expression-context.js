import { get, merge } from 'lodash/object'

class ExpressionContext {
  constructor(variableResolver, variableSetter, functionCaller) {
    this.variableResolver = variableResolver
    this.variableSetter = variableSetter
    this.functionCaller = functionCaller
    this.extraState = {}
  }

  resolveVariable(name) {
    let resolvedVariable = this.resolveFromExtraState(name)

    if (!resolvedVariable) {
      resolvedVariable = this.variableResolver(name)
    }

    return resolvedVariable
  }

  setVariable(name, value) {
    this.variableSetter(name, value)
  }

  addExtraState(state) {
    this.extraState = merge(this.extraState, state)
  }

  resolveFromExtraState(name) {
    return get(this.extraState, name)
  }

  callFunction(name, args) {
    return this.functionCaller(name, args)
  }
}

export default ExpressionContext
