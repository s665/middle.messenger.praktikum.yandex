import { renderDOM } from './core'
import * as components from './components/*/index.ts'
import Registration from './pages/registration'
import registerGroupComponent from './core/register-group-component'

registerGroupComponent(components)

document.addEventListener('DOMContentLoaded', () => {
  const registration = new Registration()

  renderDOM('#app', registration)
})
