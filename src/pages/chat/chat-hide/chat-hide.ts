import { Component } from '../../../core'
import './chat-hide.css'

export default class ChatHide extends Component {
  render() {
    // language=hbs
    return `
      <nav class="chat-hide">
        <ul class="menu">
          <li>
            <a class="menu-item" href="#">Профиль</a>
          </li>
          <li>
            <a class="menu-item" href="#">Создать группу</a>
          </li>
          <li>
            <a class="menu-item" href="#">Сменить пароль</a>
          </li>
        </ul>
      </nav>
    `
  }
}
