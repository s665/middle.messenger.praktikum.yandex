import { Component } from '../../../core'
import './chat-header.css'

export default class ChatHeader extends Component {
  render() {
    // language=hbs
    return `
      <div class="header">
        {{{BurgerButton onClick=onShowMenu}}}
        {{#if isShowMenu}}
          {{{ChatHide}}}
        {{else}}
          {{{Input className="header__search" type="text" placeholder="Поиск..."}}}
        {{/if}}
      </div>
    `
  }

  protected getStateFromProps() {
    this.state = {
      isShowMenu: false,

      onShowMenu: () => {
        this.setState({ isShowMenu: !this.state.isShowMenu })
      },
    }
  }
}
