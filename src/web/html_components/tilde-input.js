import Tilde from '..'

class TildeInput {
  constructor(element) {
    // Check if element is INPUT
    this.element = element
    this.boundAttributes = []

    let attributes = this.element.attributes

    for (var i = 0; i < attributes.length; i++) {
      let attr = attributes[i]
      if (attr.name.startsWith('~') || attr.name === 'data-tilde-attr') {
        let statePath = attr.value
        let state = Tilde.findState(statePath)

        state.on('change', (_, newValue) => {
          let originalAttribute = attr.name.replace('~', '')

          // It doesnt enter an infinite loop of 'change' triggers...
          this.element.setAttribute(originalAttribute, newValue)
        })

        this.element.addEventListener('change', (_) => {
          Tilde.updateState({ path: statePath, value: this.element.value })
        })
      }
    }
  }
}

export default TildeInput
