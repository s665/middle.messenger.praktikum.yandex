import { renderDOM } from './core'
import Login from './pages/login'
import * as components from './components/*/index.ts'
import registerGroupComponent from './core/register-group-component'

registerGroupComponent(components)

document.addEventListener('DOMContentLoaded', () => {
  const login = new Login()

  renderDOM('#app', login)
})
