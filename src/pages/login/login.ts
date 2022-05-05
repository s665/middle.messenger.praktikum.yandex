import { Component } from '../../core'
import './form-group.css'
import { rulesCollection, validate } from '../../utils'
import api from '../../services/api'
import { router } from '../../core/router'
import store from '../../services/store'

export default class Login extends Component {
  private initUser() {
    api.auth
      .getUser()
      .then(data => {
        if (data.status === 200) {
          store.setUser(data.response)
          router.go('/messenger')
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  init() {
    this.initUser()
  }

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
      authError: '',
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
          authError: '',
        }

        Object.entries(loginData).forEach(([key, value]) => {
          // @ts-ignore
          nextState.errors[key] = validate(value, rulesCollection[key])
        })

        this.setState(nextState)
        if (Object.values(nextState.errors).every(e => !e)) {
          this.setChildProps(`authError`, { text: '' })
          api.auth
            .signin({ login: this.state.values.login, password: this.state.values.password })
            .then(data => {
              if (data.status !== 200) {
                this.setChildProps(`authError`, { text: data.response.reason })
                return
              }
              router.go('/messenger')
            })
            .catch(err => {
              throw new Error(err)
            })
        }
      },

      onRegistration: () => {
        location.pathname = '/sign-up'
      },
    }
  }

  protected render() {
    const { errors, values, authError } = this.state
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
              {{{TextBlock ref="authError" text="${authError}" type="error"}}}
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
