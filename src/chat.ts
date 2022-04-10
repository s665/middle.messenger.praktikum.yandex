import { renderDOM } from './core'
import Chat from './pages/chat'
import * as components from './components/*/index.ts'
import * as chatComponents from './pages/chat/*/index.ts'
import registerGroupComponent from './core/register-group-component'

registerGroupComponent(chatComponents)
registerGroupComponent(components)

document.addEventListener('DOMContentLoaded', () => {
  const chat = new Chat()

  renderDOM('#app', chat)
})
