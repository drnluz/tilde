import VoltInput from './volt-input'
import '@webcomponents/custom-elements'

class VoltForm extends HTMLElement {
  constructor() {
    super()
    this.formFields = []
  }

  setupVoltInput(element) {
    let input = new VoltInput(element)
    this.formFields.push(input)
  }

  connectedCallback() {
    let children = this.childNodes
    children.forEach((child) => {
      switch(child.tagName) {
        case "INPUT":
          this.setupVoltInput(child)
          break
      }
    })
  }
}

export default VoltForm
