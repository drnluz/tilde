import '@webcomponents/custom-elements'
import TildeGeneric from './tilde-generic'

class TildeView extends HTMLElement {
  constructor() {
    super()
    this.root = null
  }

  connectedCallback() {
    this.root = new TildeGeneric(this)
  }
}

export default TildeView
