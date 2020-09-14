import { isObject } from 'lodash/lang'

class StateTree {
  constructor(value, parent, callbacks) {
    this._parent = parent
    this._value = value
    this._callbacks = callbacks || {}

    if (isObject(this._value)) {
      Object.keys(this._value).forEach((key) => {
        this._value[key] = new StateTree(this._value[key], this)
      })
    }
  }

  setKey(key, obj) {
    this._value[key] = new StateTree(obj, this)
  }

  get(key) {
    return this._value[key]
  }

  set(newValue, emit = true) {
    if (isObject(newValue)) {
      this._value = new StateTree(newValue, this)
    }
    else {
      this._value = newValue
    }

    if (emit) {
      this.emit('change')
    }
  }

  add(newValue) {
    this._value = this._value.concat(new StateTree(newValue, this))
    this.emit('change')
  }

  on(event, callback) {
    this._callbacks[event] = this._callbacks[event] || []
    this._callbacks[event].push(callback)

    return this
  }

  emit(event, propagate = true) {
    let callbacks = this._callbacks[event] || []

    // TODO: Currently we only emit 'change' event, that's why I'm including the value
    callbacks.forEach((callback) => callback(event, this._value))

    if (propagate && this._parent) {
      this._parent.emit(event)
    }

    return this
  }
}

export default StateTree
