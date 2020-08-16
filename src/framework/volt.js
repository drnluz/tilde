import StateTree from "./state-tree"

class Volt {
  constructor() {
    this.state = new StateTree({})
  }

  addState(name, obj) {
    this.state[name] = obj
  }
}

export default Volt
