import { Component } from '../../../core'
import './chat-item.css'

interface IChatProps {
  id: number
  chatName: string
  lastMessage: string
  isActive: boolean
  onClick: () => void
}

export default class ChatItem extends Component {
  constructor(props: IChatProps) {
    super(props)
  }

  init() {
    this.events = {}
    if (this.props.onClick) {
      this.events.click = () => this.props.onClick(this.props.id, this.props.chatName)
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
              {{chatName}}
            </span>
            <span class="chat-details__last-message">
              {{lastMessage}}
            </span>
          </div>
        </div>
      </div>`
  }

  protected getStateFromProps(props: IChatProps) {
    this.state = {
      userMessage:
        props.lastMessage?.length > 20 ? `${props.lastMessage.slice(0, 20)}...` : props.lastMessage,
    }
  }
}
