import Tilde from '..'

class TildeInput {
  constructor(element) {
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
          this.element.setAttribute(originalAttribute, newValue)
        })
      }
    }
  }
}

export default TildeInput
