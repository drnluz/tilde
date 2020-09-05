import '@webcomponents/custom-elements'
import ComponentBuilder from '../components/component-builder'

class TildeView extends HTMLElement {
  constructor() {
    super()
    this.root = null
  }

  connectedCallback() {
    this.root = ComponentBuilder.build(this)
  }
}

export default TildeView
