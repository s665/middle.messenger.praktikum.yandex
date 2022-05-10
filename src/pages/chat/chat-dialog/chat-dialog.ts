import { Component } from '../../../core'
import './chat-dialog.css'
import store from '../../../services/store'
import api from '../../../services/api'
import { WSMessageResponse, WSResponse } from './ws.types'

interface IChatDialog {
  chatName: string
  id: number
}

interface IChatItem {
  message: string
  time: Date
  type: 'me' | 'you'
}

export default class ChatDialog extends Component {
  private socket: WebSocket

  constructor(props: IChatDialog) {
    super(props)
  }

  init() {
    this.getToken()
  }

  render() {
    // language=hbs
    return `
      <main class="chat-dialog">
        {{#if id}}
          <div class="chat-dialog__header">
            <h3>{{userName}}</h3>
            <div>
              {{{DropDown listMenu=dropDownMenu}}}
            </div>
          </div>
          <div class="chat-dialog__content">
            {{#each messages}}
              {{{ChatDialogItem message=message type=type}}}
            {{/each}}
          </div>
          <div class="chat-dialog__send">
            {{{Input ref="message" className="input"}}}
            {{{Button className="send-button" label="Отправить" type="primary" onClick=onSubmit}}}
          </div>
        {{else}}
          <div class="block-center">Выберите чат</div>
        {{/if}}
        {{{ChatAddUserModal id=id isVisible=isVisibleAddUserModal onClose=onToggleAddUserModal}}}
        {{{ChatDeleteUserModal id=id isVisible=isVisibleDeleteUserModal
                               onClose=onToggleDeleteUserModal}}}
      </main>
    `
  }

  private transformDataResponse = (data: WSMessageResponse, userId: number): IChatItem => {
    return {
      time: new Date(data.time),
      message: data.content,
      type: data.user_id === userId ? 'me' : 'you',
    }
  }

  protected componentDidMount() {
    const { token } = this.state
    const user = store.getUser()
    if (this.props.id && user?.id) {
      this.socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${user?.id}/${this.props.id}/${token}`
      )
      this.socket.addEventListener('open', () => {
        this.socket.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          })
        )
        this.setState({ isOpenWS: true })
        this.startPingingSocket()
      })

      this.socket.addEventListener('message', event => {
        const data: WSResponse = JSON.parse(event.data)
        if (!Array.isArray(data)) {
          if (data.type === 'user connected' || data.type === 'pong') {
            return
          }
        }
        if (Array.isArray(data)) {
          this.setState({
            messages: data.map(item => this.transformDataResponse(item, user.id)),
          })
        } else {
          this.setState({
            messages: [this.transformDataResponse(data, user.id), ...this.state.messages],
          })
        }
      })

      this.socket.addEventListener('close', event => {
        if (event.wasClean) {
          console.log('[close] Соединение закрыто')
        } else {
          console.log('[close] Соединение прервано')
        }

        console.log(`[close] Код: ${event.code} | Причина: ${event.reason}`)
      })

      this.socket.addEventListener('error', event => {
        // @ts-ignore
        console.log('Error', event.message)
      })
    }
  }

  protected getStateFromProps() {
    this.state = {
      isOpenWS: false,
      isVisibleAddUserModal: false,
      isVisibleDeleteUserModal: false,
      currentUser: store.getUser(),
      message: '',
      messages: [],
      token: '',
      onToggleAddUserModal: () => {
        this.setState({ isVisibleAddUserModal: !this.state.isVisibleAddUserModal })
      },
      onToggleDeleteUserModal: () => {
        this.setState({ isVisibleDeleteUserModal: !this.state.isVisibleDeleteUserModal })
      },
      dropDownMenu: [
        {
          title: 'Добавить пользователя',
          onClick: () => this.state.onToggleAddUserModal(),
        },
        {
          title: 'Удалить пользователя',
          onClick: () => this.state.onToggleDeleteUserModal(),
        },
      ],
      onSubmit: () => {
        const inputMessage = this.getChildByRef('message').getString()
        if (inputMessage) {
          this.socket.send(
            JSON.stringify({
              content: inputMessage,
              type: 'message',
            })
          )
          this.setState({ message: '' })
        }
      },
    }
  }

  private startPingingSocket(timeout = 3000) {
    setInterval(() => {
      this.socket.send(
        JSON.stringify({
          type: 'ping',
        })
      )
    }, timeout)
  }

  private getToken() {
    api.chat.getToken(this.props.id).then(data => {
      if (data.status === 200) {
        this.setState({ token: data.response.token })
      }
    })
  }
}
