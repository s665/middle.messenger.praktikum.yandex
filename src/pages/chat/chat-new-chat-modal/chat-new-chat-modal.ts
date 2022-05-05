import { Component } from '../../../core'
import api from '../../../services/api'
import { validate } from '../../../utils'

interface IChatNewChatModal {
  isVisible: boolean
  onSubmit: () => void
  onClose: () => void
}

export default class ChatNewChatModal extends Component {
  constructor(props: IChatNewChatModal) {
    super(props)
  }

  render() {
    // language=hbs
    return `
      <div>
        {{#if isVisible}}
          <div class="modal-overlay">
          </div>
          <div class="block-center">
            <div class="paper">
              <h1>Добавить чат</h1>
              <div class="form-group">
                {{{Input ref="newChat" label="Название чата"}}}
                {{{TextBlock ref="newChatError" text=newChatError type="error"}}}
                <div class="form-group__item">
                  {{{Button label="Добавить" type="primary" onClick=onSubmit}}}
                </div>
                <div class="form-group__item">
                  {{{Button label="Отмена" onClick=onClose}}}
                </div>
              </div>
            </div>
          </div>
        {{/if}}
      </div>
    `
  }

  protected getStateFromProps(props: IChatNewChatModal) {
    this.state = {
      newChatError: '',
      onSubmit: () => {
        const chatName = this.getChildByRef('newChat').getString()
        const error = validate(chatName, ['isNull'])
        if (error) {
          this.setState({ newChatError: error })
          return
        }
        api.chat
          .createChat(chatName)
          .then(data => {
            if (data.status === 200) {
              props.onClose()
            }
          })
          .catch(err => {
            throw new Error(err)
          })
      },
    }
  }
}
