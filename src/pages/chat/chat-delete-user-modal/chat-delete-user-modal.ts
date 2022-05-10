import { Component } from '../../../core'
import api from '../../../services/api'

interface IChatDeleteUserModal {
  isVisible: boolean
  onSubmit: () => void
  onClose: () => void
  id: number
}

export default class ChatDeleteUserModal extends Component {
  constructor(props: IChatDeleteUserModal) {
    super(props)
  }

  render() {
    // language=hbs
    return `
      <div>
        {{#if isVisible}}
          <div class="block-center">
            <div class="paper">
              <h1>Удалить пользователя</h1>
              <div class="form-group">
                {{{Input ref="userId" label="ID пользователя"}}}
                <div class="form-group__item">
                  {{{Button label="Удалить пользователя" type="primary" onClick=onDeleteUser}}}
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

  protected getStateFromProps(props: IChatDeleteUserModal) {
    this.state = {
      onDeleteUser: () => {
        const userId = this.getChildByRef('userId').getString()
        api.chat
          .deleteUserToChat(+userId, props.id)
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
