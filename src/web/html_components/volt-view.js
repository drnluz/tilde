import '@webcomponents/custom-elements'
import VoltGeneric from './volt-generic'

class VoltView extends HTMLElement {
  constructor() {
    super()
    this.root = null
  }

  connectedCallback() {
    this.root = new VoltGeneric(this)
  }
}

export default VoltView
