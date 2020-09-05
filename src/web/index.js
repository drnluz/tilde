import Tilde from '../framework/tilde'
import TildeState from './html_components/tilde-state'
import TildeView from './html_components/tilde-view'

const tildeInstance = new Tilde()

window.tilde = tildeInstance

window.addEventListener('DOMContentLoaded', (_) => {
  window.customElements.define('t-state', TildeState)
  window.customElements.define('t-view', TildeView)
})

export default tildeInstance
