import { registerComponent, renderDOM } from './core'
import Chat, { ChatDialog, ChatDialogItem, ChatHeader, ChatHide, ChatItem } from './pages/chat'
import BurgerButton from './components/burger-button'
import Input from './components/input'
import Button from './components/button'

registerComponent(ChatHeader)
registerComponent(BurgerButton)
registerComponent(ChatHide)
registerComponent(Input)
registerComponent(ChatItem)
registerComponent(ChatDialog)
registerComponent(Button)
registerComponent(ChatDialogItem)

document.addEventListener('DOMContentLoaded', () => {
  const chat = new Chat()

  renderDOM('#app', chat)
})
