import Tilde from '..'
import '@webcomponents/custom-elements'

class TildeState extends HTMLElement {
  constructor() {
    super()

    var stateObject = {}
    let innerScript = this.querySelector('script')

    if (innerScript) {
      stateObject = JSON.parse(innerScript.text)
    }

    // Check if this attribute exists and raise error if not
    let name = this.attributes.name.value
    Tilde.addState(name, stateObject)
  }
}

export default TildeState
