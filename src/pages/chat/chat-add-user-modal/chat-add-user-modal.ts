import { Component } from '../../../core'
import api from '../../../services/api'

interface IChatAddUserModal {
  isVisible: boolean
  onSubmit: () => void
  onClose: () => void
  id: number
}

export default class ChatAddUserModal extends Component {
  constructor(props: IChatAddUserModal) {
    super(props)
  }

  render() {
    // language=hbs
    return `
      <div>
        {{#if isVisible}}
          <div class="block-center">
            <div class="paper">
              <h1>Добавить пользователя</h1>
              <div class="form-group">
                {{{Input ref="userId" label="ID пользователя"}}}
                <div class="form-group__item">
                  {{{Button label="Добавить пользователя" type="primary" onClick=onAddUser}}}
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

  protected getStateFromProps(props: IChatAddUserModal) {
    this.state = {
      onAddUser: () => {
        const userId = this.getChildByRef('userId').getString()
        api.chat
          .addUserToChat(+userId, props.id)
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
