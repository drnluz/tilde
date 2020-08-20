import Volt from '../framework/volt'
import VoltState from './html_components/volt-state'
import VoltForm from './html_components/volt-form'
import VoltView from './html_components/volt-view'

const voltInstance = new Volt()

window.Volt = voltInstance

window.addEventListener('DOMContentLoaded', (event) => {
  window.customElements.define('v-state', VoltState)
  window.customElements.define('v-form', VoltForm)
  window.customElements.define('v-view', VoltView)
})

export default voltInstance
