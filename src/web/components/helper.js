import Tilde from '..'

export function setVariable(variableName, value) {
  Tilde.findState(variableName).update(value)
}

export function resolveVariable(name) {
  return Tilde.findState(name)._value
}

export function findState(name) {
  return Tilde.findState(name)
}
