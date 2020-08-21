import Tilde from '..'

class TildeGeneric {
  constructor(element) {
    this.element = element
    this.children = []

    this.setupTildeAttributes()
    this.setupChildren()
  }

  setupChildren() {
    if (this.element.childElementCount == 0) {
      return
    }

    Array.from(this.element.children).forEach((child) => {
      this.children.push(new TildeGeneric(child))
    })
  }

  setupTildeAttributes() {
    console.log('hey', this.element)

    const attributes = this.element.attributes
    for (var i = 0; i < attributes.length; i++) {
      let attr = attributes[i]
      if (attr.name.startsWith('~') || attr.name === 'data-tilde-attr') {

        // Now it got tricky! What if attr contains an expression??

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

export default TildeGeneric
