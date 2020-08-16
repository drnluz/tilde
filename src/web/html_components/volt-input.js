import Volt from '..'

class VoltInput {
  constructor(element) {
    // Check if element is INPUT
    this.element = element
    this.boundAttributes = []

    let attributes = this.element.attributes

    for (var i = 0; i < attributes.length; i++) {
      let attr = attributes[i]
      if (attr.name.startsWith('~') || attr.name === 'data-volt-attr') {
        let statePath = attr.value
        let state = Volt.findState(statePath)

        state.on('change', (_, newValue) => {
          let originalAttribute = attr.name.replace('~', '')
          this.element.setAttribute(originalAttribute, newValue)
        })

        // Listen for changes in state and update attribute.
        // How to avoid loop???
        this.element.addEventListener('change', (_) => {
          Volt.updateState(statePath, this.element.value, false)
        })
      }
    }
  }
}

export default VoltInput
