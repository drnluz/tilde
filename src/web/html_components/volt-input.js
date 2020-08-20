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

          // It doesnt enter an infinite loop of 'change' triggers...
          this.element.setAttribute(originalAttribute, newValue)
        })

        this.element.addEventListener('change', (_) => {
          Volt.updateState({ path: statePath, value: this.element.value })
        })
      }
    }
  }
}

export default VoltInput
