import { registerComponent, renderDOM } from './core'
import Input from './components/input/input'
import Button from './components/button'
import TextBlock from './components/text-block'
import Registration from './pages/registration'

registerComponent(Input)
registerComponent(Button)
registerComponent(TextBlock)

document.addEventListener('DOMContentLoaded', () => {
  const registration = new Registration()

  renderDOM('#app', registration)
})
