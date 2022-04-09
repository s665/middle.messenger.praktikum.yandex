import { registerComponent, renderDOM } from './core'
import Input from './components/input/input'
import Login from './pages/login'
import Button from './components/button'
import TextBlock from './components/text-block'

registerComponent(Input)
registerComponent(Button)
registerComponent(TextBlock)

document.addEventListener('DOMContentLoaded', () => {
  const login = new Login()

  renderDOM('#app', login)
})
