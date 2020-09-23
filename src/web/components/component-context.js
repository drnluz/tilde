import Tilde from '..'

class ComponentContext {
  constructor(node) {
    this.node = node
  }

  findState(name) {
    return Tilde.findState(name, this.node)
  }

  resolveVariable(name) {
    return this.findState(name)._value
  }

  setVariable(name, value) {
    Tilde.findState(name).set(value)
  }

  callFunction(name, args) {
    return Tilde.callFunction(name, args)
  }
}

export default ComponentContext
