import StateTree from "./state-tree"

class Tilde {
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

  updateState({ path, value, emit }) {
    const statePart = this.findState(path)
    statePart.update(value, emit)
  }
}

export default Tilde
