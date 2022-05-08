import { Component } from '../../core'
import './chat.css'
import api from '../../services/api/api'
import store from '../../services/store'

export default class Chat extends Component {
  init() {
    this.getChatItems()
  }

  protected render() {
    // language=hbs
    return `
      <div>
        <div class="layout">
          <div class="side">
            <header>
              {{{ChatHeader isShowMenu=isShowMenu onToggleMenu=onToggleMenu
                            onToggleShowNewChatModal=onToggleShowNewChat}}}
            </header>
            <div class="list-wrap">
              {{#each chats}}
                {{{ChatItem id=this.id chatName=this.title lastMessage=this.last_message.content
                            onClick=this.onClick isActive=this.isActive}}}
              {{/each}}
            </div>
          </div>
          <div class="content">
            {{{ChatDialog id=currentChat.id userName=currentChat.chatName}}}
          </div>
        </div>
        {{{ChatNewChatModal isVisible=isShowNewChat onClose=onToggleShowNewChat chatsName=chatsName}}}
      </div>
    `
  }

  protected componentDidMount() {
    this.getUserInfo()
  }

  protected getStateFromProps() {
    this.state = {
      chats: [],
      chatsName: [],
      token: '',
      currentChat: null,
      isShowNewChat: false,
      onToggleShowNewChat: () => {
        this.setState({ isShowNewChat: !this.state.isShowNewChat })
        this.getChatItems()
      },
      isShowMenu: false,
      onToggleMenu: () => {
        this.setState({ isShowMenu: !this.state.isShowMenu })
      },
      onSelectChat: (id: number, chatName: string) => {
        this.setState({ currentChat: { id, chatName } })
        this.setState({
          // @ts-ignore
          chats: this.state.chats.map(item => {
            if (item.id === id) {
              return {
                ...item,
                isActive: true,
              }
            }
            return {
              ...item,
              isActive: false,
            }
          }),
        })
      },
    }
  }

  private getChatItems() {
    api.chat
      .getChats()
      .then(data => {
        const chatsName: string[] = []
        this.setState({
          currentChat: data.response[0].id,
          // @ts-ignore
          chats: data.response.map(item => {
            chatsName.push(item.title)
            return Object.assign(item, {
              onClick: (id: number, chatName: string) => this.state.onSelectChat(id, chatName),
            })
          }),
          chatsName,
        })
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  private getUserInfo() {
    api.auth
      .getUser()
      .then(data => {
        store.setUser({ ...data.response })
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
