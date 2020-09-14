import '@webcomponents/custom-elements'
import ComponentBuilder from '../components/component-builder'
import Tilde from '..'
import ElementContext from '../components/element-context'

class TildeView extends HTMLElement {
  constructor() {
    super()
    this.root = null
  }

  connectedCallback() {
    this.root = ComponentBuilder.build(this, new ElementContext(Tilde.state))
  }
}

export default TildeView
