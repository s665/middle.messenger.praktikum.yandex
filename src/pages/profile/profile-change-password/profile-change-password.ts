import { Component } from '../../../core'
import { rulesCollection, validate } from '../../../utils'

interface IProfileChangePassword {
  isVisible: boolean
  onSubmit: () => void
  onClose: () => void
  message: string
}

export default class ProfileChangePassword extends Component {
  constructor(props: IProfileChangePassword) {
    super(props)
  }

  protected render() {
    // language=hbs
    return `
      <div class="change-password-modal">
        {{#if isVisible}}
          <div class="modal-overlay">
          </div>
          <div class="block-center">
            <div class="paper">
              <h1>Изменить пароль</h1>
              <div class="form-group">
                <div class="form-group__item">
                  {{{Input ref="oldPassword" type="password" label="Старый пароль"
                           value=oldPassword}}}
                  {{{Input ref="newPassword" type="password" label="Новый пароль"}}}
                  {{{Input ref="confirmNewPassword" type="password" label="Подтвердите пароль"}}}
                  {{{TextBlock ref="passwordError" text=error type="error"}}}
                  {{{TextBlock text=message type="primary"}}}
                  <div class="form-group__item">
                    {{{Button label="Изменить" type="primary" onClick=onChange}}}
                  </div>
                  <div class="form-group__item">
                    {{{Button label="Отмена" onClick=onClose}}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {{/if}}
      </div>
    `
  }

  protected getStateFromProps(props: any) {
    this.state = {
      oldPassword: '',
      error: '',
      onChange: () => {
        const passwordData = {
          oldPassword: this.getChildByRef('oldPassword').getString(),
          newPassword: this.getChildByRef('newPassword').getString(),
          confirmNewPassword: this.getChildByRef('confirmNewPassword').getString(),
        }

        const errorValidate = validate(passwordData.newPassword, rulesCollection.password)

        if (!!errorValidate) {
          console.log(errorValidate)
          this.setState({
            oldPassword: passwordData.oldPassword,
            error: errorValidate,
          })
          return
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
          this.setState({
            oldPassword: passwordData.oldPassword,
            error: 'Пароли не совпадают',
          })
          return
        }

        if (Object.values(passwordData).some(v => v === '')) {
          this.setState({
            oldPassword: passwordData.oldPassword,
            error: 'Заполните все поля',
          })
        }
        props.onSubmit({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        })
      },
    }
  }
}
