import StateTree from "./state-tree"

class Tilde {
  constructor() {
    this.state = new StateTree({})
  }

  addState(name, obj) {
    this.state.setKey(name, obj)
  }

  findState(path, stateNode) {
    const pathParts = path.split('.')
    let statePart = stateNode || this.state

    pathParts.forEach((pathPart) => {
      statePart = statePart.get(pathPart)
    })

    return statePart
  }

  updateState({ path, value, emit }) {
    const statePart = this.findState(path)
    statePart.set(value, emit)
  }

  callFunction(name, args) {
    const splitName = name.split('.')
    const stateName = splitName.slice(0, -1).join('.')
    const methodName = splitName.slice(-1)[0]

    // TODO: Validate if method name is allowed
    const state = this.findState(stateName)
    const fn = state[methodName]

    fn.call(state, ...args)


    console.log(name + '(' + args.join(',') + ')')
  }
}

export default Tilde
