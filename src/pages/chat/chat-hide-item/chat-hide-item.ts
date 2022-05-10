import { Component } from '../../../core'
import './chat-hide-item.css'

interface IChatHideItem {
  label: string
  action: () => void
}

export default class ChatHideItem extends Component {
  constructor(props: IChatHideItem) {
    super(props)
  }

  init() {
    this.events = {}
    if (this.props.action) {
      this.events.click = this.props.action
    }
  }

  render() {
    // language=hbs
    return `
      <li>
        <button class="hide-item">{{label}}</button>
      </li>
    `
  }
}
