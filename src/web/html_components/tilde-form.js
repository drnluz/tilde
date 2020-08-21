import TildeInput from './tilde-input'
import '@webcomponents/custom-elements'

class TildeForm extends HTMLElement {
  constructor() {
    super()
    this.formFields = []
  }

  setupTildeInput(element) {
    let input = new TildeInput(element)
    this.formFields.push(input)
  }

  connectedCallback() {
    let children = this.childNodes
    children.forEach((child) => {
      switch(child.tagName) {
        case "INPUT":
          this.setupTildeInput(child)
          break
      }
    })
  }
}

export default TildeForm
