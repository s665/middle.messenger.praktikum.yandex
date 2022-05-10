import { Component } from '../../../core'
import './chat-header.css'
import api from '../../../services/api'
import { router } from '../../../core/router'

interface IChatHeader {
  onToggleMenu: () => void
  onToggleShowNewChatModal: () => void
  isShowMenu: boolean
}

export default class ChatHeader extends Component {
  constructor(props: IChatHeader) {
    super(props)
  }
  render() {
    // language=hbs
    return `
      <div class="header">
        {{{BurgerButton onClick=onToggleMenu}}}
        {{#if isShowMenu}}
          {{{ChatHide menuItems=hideMenu}}}
        {{else}}
          {{{Input className="header__search" type="text" placeholder="Поиск..."}}}
        {{/if}}
      </div>
    `
  }

  protected getStateFromProps(props: IChatHeader) {
    this.state = {
      hideMenu: [
        {
          label: 'Профиль',
          action: () => {
            props.onToggleMenu()
            router.go('/profile')
          },
        },
        {
          label: 'Добавить чат',
          action: () => {
            props.onToggleMenu()
            props.onToggleShowNewChatModal()
          },
        },
        {
          label: 'Выйти',
          action: () => {
            api.auth
              .logout()
              .then(data => {
                if (data.status === 200) {
                  props.onToggleMenu()
                  router.go('/')
                }
              })
              .catch(err => {
                throw new Error(err)
              })
          },
        },
      ],
    }
  }
}
