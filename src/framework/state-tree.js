import { isObject } from 'lodash/lang'

class StateTree {
  constructor(value, parent, callbacks) {
    this._value = value
    this._parent = parent
    this._callbacks = callbacks || {}

    this._initializeChild()
  }

  set(newValue, emit = true) {
    this._value = newValue
    this._initializeChild()

    if (emit) {
      this.emit('change')
    }

    return this
  }

  setKey(key, obj, emit = true) {
    this._value[key] = new StateTree(obj, this)
    this._defineGetterAndSetter(key)

    if (emit) {
      this.emit('change')
    }

    return this
  }

  add(newValue, emit = true) {
    this._value = this._value.concat(new StateTree(newValue, this))

    if (emit) {
      this.emit('change')
    }

    return this
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

  /* Private */

  _initializeChild() {
    if (!isObject(this._value)) {
      return
    }

    Object.keys(this._value).forEach((key) => {
      this._value[key] = new StateTree(this._value[key], this)
      this._defineGetterAndSetter(key)
    })
  }

  _defineGetterAndSetter(key) {
    let _this = this

    Object.defineProperty(this, key, {
      get: () => _this._value[key],
      set: (newValue) => _this.setKey(key, newValue),
      configurable: true
    })
  }

}

export default StateTree
