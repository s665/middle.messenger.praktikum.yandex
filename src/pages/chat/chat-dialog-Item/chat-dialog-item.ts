import { Component } from '../../../core'
import './chat-dialog-item.css'

interface IChatDialogItem {
  type: 'me' | 'you'
  message: string
  className: string
}

export default class ChatDialogItem extends Component {
  constructor(props: IChatDialogItem) {
    super(props)
  }

  render() {
    // language=hbs
    return `
      <div class="chat-dialog-item {{className}} {{type}}">
          {{message}}
      </div>
    `
  }
}
