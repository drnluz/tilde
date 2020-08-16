import StateTree from "./state-tree"

class Volt {
  constructor() {
    this.state = new StateTree({})
  }

  addState(name, obj) {
    this.state[name] = new StateTree(obj)
  }

  findState(path) {
    const pathParts = path.split('.')
    let statePart = this.state

    pathParts.forEach((pathPart) => {
      statePart = statePart[pathPart] || {}
    })

    return statePart
  }

  updateState(path, newValue, emit) {
    const pathParts = path.split('.')
    let statePart = this.findState(path)
    statePart.update(newValue, emit)
  }
}

export default Volt
