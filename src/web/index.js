import Volt from '../framework/volt'
import VoltState from './html_components/volt-state'

const voltInstance = new Volt()

window.Volt = voltInstance

window.addEventListener('DOMContentLoaded', (event) => {
  window.customElements.define('v-state', VoltState)
})

export default voltInstance
