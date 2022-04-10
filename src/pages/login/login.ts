import { Component } from '../../core'
import './form-group.css'
import validate, { rulesCollection } from '../../utils'

export default class Login extends Component {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      onValidate: (e: Event) => this.validateField(e),
      onSubmit: () => {
        const loginData = {
          login: this.getChildByRef('login').getString(),
          password: this.getChildByRef('password').getString(),
        }

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        }

        Object.entries(loginData).forEach(([key, value]) => {
          // @ts-ignore
          nextState.errors[key] = validate(value, rulesCollection[key])
        })

        this.setState(nextState)
        console.log('action/login', this.state.values)
      },
      onRegistration: () => {
        location.pathname = '/registration.html'
      },
    }
  }

  protected render() {
    const { errors, values } = this.state
    // language=hbs
    return `
      <main>
        <div class="block-center">
          <div class="paper">
            <h1>Авторизация</h1>
            <div class="form-group">
              {{{Input ref="login" name="login" label="Логин"
                       value="${values.login}" onFocus=onValidate onBlur=onValidate}}}

              {{{TextBlock ref="loginError" text="${errors.login}" type="error"}}}
              {{{Input ref="password" name="password" label="Пароль"
                       value="${values.password}" onFocus=onValidate onBlur=validateField}}}
              {{{TextBlock ref="passwordError" text="${errors.password}" type="error"}}}
              <div class="form-group__item">
                {{{Button label="Войти" type="primary" onClick=onSubmit}}}
              </div>
              <div class="form-group__item">
                {{{Button label="Зарегистрироваться" onClick=onRegistration}}}
              </div>
            </div>
          </div>
        </div>
      </main>
    `
  }

  private validateField(e: Event) {
    const refName = (e.target as HTMLInputElement).name
    const value = this.getChildByRef(`${refName}`).getString()
    const errorMessage = validate(value, rulesCollection[refName])
    if (errorMessage) {
      this.setChildProps(`${refName}Error`, { text: errorMessage })
      return
    }
    this.setChildProps(`${refName}Error`, { text: '' })
  }
}
