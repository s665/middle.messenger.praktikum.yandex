import { Component } from '../../../core'
import store from '../../../services/store'

export interface IChangeUserData {
  firstName: string
  secondName: string
  login: string
  email: string
  phone: string
  displayName: string
}

interface IProfileChangeData {
  isVisible: boolean
  onSubmit: (data: IChangeUserData) => void
  onClose: () => void
  message: string
  user: IChangeUserData
}

export default class ProfileChangeData extends Component {
  constructor(props: IProfileChangeData) {
    super(props)
  }

  protected getStateFromProps() {
    const user = store.getUser()
    this.state = {
      values: {
        firstName: user?.first_name,
        secondName: user?.second_name,
        login: user?.login,
        email: user?.email,
        phone: user?.phone,
        displayName: user?.display_name,
      },
      apiError: '',
      onChangeData: () => {
        const userData = {
          firstName: this.getChildByRef('firstName').getString(),
          secondName: this.getChildByRef('secondName').getString(),
          login: this.getChildByRef('login').getString(),
          email: this.getChildByRef('email').getString(),
          phone: this.getChildByRef('phone').getString(),
          displayName: this.getChildByRef('displayName').getString(),
        }

        const nextState = {
          values: { ...userData },
        }

        this.props.onSubmit(userData)

        this.setState(nextState)
      },
    }
  }

  protected render() {
    const { values } = this.state
    // language=hbs
    return `
      <div class="change-password-modal">
        {{#if isVisible}}
          <div class="modal-overlay">
          </div>
          <div class="block-center">
            <div class="paper">
              <h1>Регистрация</h1>
              <div class="form-group">
                {{{Input ref="email" name="email" label="Почта"
                         value="${values.email || ''}" onFocus=onValidate onBlur=onValidate}}}

                {{{Input ref="login" name="login" label="Логин"
                         value="${values.login || ''}" onFocus=onValidate onBlur=onValidate}}}

                {{{Input ref="firstName" name="firstName" label="Имя"
                         value="${values.firstName || ''}" onFocus=onValidate onBlur=onValidate }}}

                {{{Input ref="secondName" name="secondName" label="Фамилия"
                         value="${values.secondName || ''}" onFocus=onValidate onBlur=onValidate}}}

                {{{Input ref="displayName" name="displayName" label="Имя в чате"
                         value="${values.displayName || ''}" onFocus=onValidate onBlur=onValidate}}}

                {{{Input ref="phone" name="phone" label="Телефон"
                         value="${values.phone || ''}" onFocus=onValidate onBlur=onValidate}}}

                {{{TextBlock ref="apiError" text=message type="error"}}}

                <div class="form-group__item">
                  {{{Button label="Изменить" type="primary" onClick=onChangeData}}}
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
}
