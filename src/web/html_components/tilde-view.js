import '@webcomponents/custom-elements'
import ComponentBuilder from '../components/component-builder'
import Tilde from '..'
import ComponentContext from '../components/component-context'

class TildeView extends HTMLElement {
  constructor() {
    super()
    this.root = null
  }

  connectedCallback() {
    this.root = ComponentBuilder.build(this, new ComponentContext(Tilde.state))
  }
}

export default TildeView
