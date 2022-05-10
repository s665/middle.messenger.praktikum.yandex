import { Component } from '../../../core'
import store from '../../../services/store'
import { checkIsEmptyValues, rulesCollection, validate } from '../../../utils'

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
      errors: {
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        phone: '',
        displayName: '',
      },
      apiError: '',
      onValidate: (e: Event) => this.validateField(e),
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
          errors: {
            firstName: '',
            secondName: '',
            login: '',
            email: '',
            phone: '',
            displayName: '',
          },
        }

        Object.entries(userData as { [key: string]: string }).forEach(([key, value]) => {
          if (key === 'firstName' || key === 'secondName' || key === 'displayName') {
            nextState.errors[key] = validate(value, rulesCollection.name)
            return
          }
          // @ts-ignore
          nextState.errors[key] = validate(value, rulesCollection[key])
        })

        this.setState(nextState)
        if (checkIsEmptyValues(nextState.errors)) {
          this.props.onSubmit(userData)
        }
      },
    }
  }

  protected render() {
    const { values, errors } = this.state
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
                {{{TextBlock ref="emailError" text="${errors.email}" type="error"}}}

                {{{Input ref="login" name="login" label="Логин"
                         value="${values.login || ''}" onFocus=onValidate onBlur=onValidate}}}
                {{{TextBlock ref="loginError" text="${errors.login}" type="error"}}}

                {{{Input ref="firstName" name="firstName" label="Имя"
                         value="${values.firstName || ''}" onFocus=onValidate onBlur=onValidate }}}
                {{{TextBlock ref="firstNameError" text="${errors.firstName}" type="error"}}}

                {{{Input ref="secondName" name="secondName" label="Фамилия"
                         value="${values.secondName || ''}" onFocus=onValidate onBlur=onValidate}}}
                {{{TextBlock ref="secondNameError" text="${errors.secondName}" type="error"}}}

                {{{Input ref="displayName" name="displayName" label="Имя в чате"
                         value="${values.displayName || ''}" onFocus=onValidate onBlur=onValidate}}}
                {{{TextBlock ref="displayNameError" text="${errors.displayName}" type="error"}}}

                {{{Input ref="phone" name="phone" label="Телефон"
                         value="${values.phone || ''}" onFocus=onValidate onBlur=onValidate}}}
                {{{TextBlock ref="phoneError" text="${errors.phone}" type="error"}}}

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

  private validateField(e: Event) {
    const refName = (e.target as HTMLInputElement).name
    const value = this.getChildByRef(`${refName}`).getString()

    let errorMessage
    if (refName === 'firstName' || refName === 'secondName' || refName === 'displayName') {
      errorMessage = validate(value, rulesCollection.name)
    } else {
      errorMessage = validate(value, rulesCollection[refName])
    }

    if (errorMessage) {
      this.setChildProps(`${refName}Error`, { text: errorMessage })
      return
    }
    this.setChildProps(`${refName}Error`, { text: '' })
  }
}
