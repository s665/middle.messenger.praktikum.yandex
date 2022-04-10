import { Component } from '../../../core'
import './chat-item.css'

interface IChatProps {
  userName: string
  lastMessage: string
  date: Date
  isActive: boolean
  onClick?: () => void
}

export default class ChatItem extends Component {
  constructor(props: IChatProps) {
    super(props)
  }

  init() {
    this.events = {}
    if (this.props.onClick) {
      this.events.click = this.props.onClick
    }
  }

  render() {
    // language=hbs
    return `
      <div class="chat-item {{#if isActive}}active{{/if}}">
        <div class="chat-details">
          <span class="chat-details__useravatar"></span>
          <div class="chat-details__wrap">
            <span>
              {{userName}}
            </span>
            <span class="chat-details__last-message">
              {{userMessage}}
            </span>
          </div>
        </div>
        <div class="chat-details__wrap-between">
          <time class="chat-details__time">
            {{userDate}}
          </time>
        </div>
      </div>`
  }

  protected getStateFromProps(props: IChatProps) {
    this.state = {
      userDate: new Date(props.date).toLocaleTimeString(),
      userMessage:
        props.lastMessage.length > 20 ? `${props.lastMessage.slice(0, 20)}...` : props.lastMessage,
    }
  }
}
