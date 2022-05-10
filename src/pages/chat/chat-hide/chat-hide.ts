import { Component } from '../../../core'
import './chat-hide.css'

interface IChatHide {
  menuItems: { label: string; action: () => void }[]
}

export default class ChatHide extends Component {
  constructor(props: IChatHide) {
    super(props)
  }

  render() {
    // language=hbs
    return `
      <nav class="chat-hide">
        <ul class="menu">
        {{#each menuItems}}
          {{{ChatHideItem label=label action=action}}}
        {{/each}}
        </ul>
      </nav>
    `
  }

  protected getStateFromProps(props: IChatHide) {
    this.state = { ...props }
  }
}
