import { Component } from '../../core'
import './chat.css'

// interface IChatItem {
//   userName: string
//   date: Date
//   lastMessage: string
//   ref: string
//   onClick: () => void
//   isActive: boolean
// }

export default class Chat extends Component {
  protected render() {
    // language=hbs
    return `
      <div class="layout">
        <div class="side">
          <header>
            {{{ChatHeader}}}
          </header>
          <div class="list-wrap">
            {{#each chats}}
              {{{ChatItem ref=ref userName=this.userName lastMessage=this.lastMessage
                          date=this.date}}}
            {{/each}}
          </div>
        </div>
        <div class="content">
          {{{ChatDialog userName=dialog.userName messages=dialog.messages}}}
        </div>
      </div>
    `
  }

  protected getStateFromProps() {
    this.state = {
      chats: [
        {
          userName: 'Вася Пупкин',
          lastMessage: 'Привет',
          date: new Date('2022-04-12T16:14'),
        },
        {
          userName: 'Иван Васильевич',
          lastMessage: 'очень длинное длинное сообщение',
          date: new Date('2022-04-12T16:14'),
        },
        {
          userName: 'Вася Пупкин',
          lastMessage: 'Привет',
          date: new Date('2022-04-12T16:14'),
        },
      ],
      dialog: {
        userName: 'Иван Васильевич',
        messages: [
          { type: 'you', message: 'Ты такую машину сделал?' },
          { type: 'me', message: 'Да, я' },
          {
            type: 'you',
            message:
              'У меня тоже один такой был — крылья сделал. Я его на бочку с порохом посадил — пущай полетает!',
          },
          { type: 'me', message: 'Зачем же так круто?' },
        ],
      },
    }
  }
}
