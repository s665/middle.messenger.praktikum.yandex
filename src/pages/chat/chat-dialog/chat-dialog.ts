import { Component } from '../../../core'
import './chat-dialog.css'

interface IChatDialog {
  userName: string
  messages: { type: 'me' | 'you'; message: string }[]
}

export default class ChatDialog extends Component {
  constructor(props: IChatDialog) {
    super(props)
  }

  render() {
    // language=hbs
    return `
      <main class="chat-dialog">
        <div class="chat-dialog__header">
          <h3>{{userName}}</h3>
        </div>
        <div class="chat-dialog__content">
          {{#each messages}}
            {{{ChatDialogItem message=message type=type}}}
          {{/each}}
        </div>
        <div class="chat-dialog__send">
          {{{Input className="input"}}}
          {{{Button className="send-button" label="Отправить"type="primary"}}}
        </div>
      </main>
    `
  }
}
