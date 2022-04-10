import { Component } from '../../core'
import validate, { rulesCollection } from '../../utils'

export default class Registration extends Component {
  protected getStateFromProps() {
    this.state = {
      values: {
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      onValidate: (e: Event) => this.validateField(e),
      goToChat: () => {
        location.pathname = 'chat.html'
      },
      onSubmit: () => {
        const loginData = {
          firstName: this.getChildByRef('firstName').getString(),
          secondName: this.getChildByRef('secondName').getString(),
          login: this.getChildByRef('login').getString(),
          email: this.getChildByRef('email').getString(),
          phone: this.getChildByRef('phone').getString(),
          password: this.getChildByRef('password').getString(),
          confirmPassword: this.getChildByRef('confirmPassword').getString(),
        }

        const nextState = {
          errors: {
            firstName: '',
            secondName: '',
            login: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
          },
          values: { ...loginData },
        }

        Object.entries(loginData as { [key: string]: string }).forEach(([key, value]) => {
          if (key === 'firstName' || key === 'secondName' || key === 'confirmPassword') {
            if (key === 'confirmPassword') {
              nextState.errors[key] =
                loginData.password === loginData.confirmPassword ? '' : 'Пароли не совпадают'
            } else {
              nextState.errors[key] = validate(value, rulesCollection.name)
            }
            return
          }
          // @ts-ignore
          nextState.errors[key] = validate(value, rulesCollection[key])
        })

        this.setState(nextState)
        console.log('action/registration', this.state.values)
      },
    }
  }

  protected render() {
    const { values, errors } = this.state
    // language=hbs
    return `
      <main>
        <div class="block-center">
          <div class="paper">
            <h1>Регистрация</h1>
            <div class="form-group">
              {{{Input ref="firstName" name="firstName" label="Имя"
                       value="${values.firstName}" onFocus=onValidate onBlur=onValidate }}}
              {{{TextBlock ref="firstNameError" text="${errors.firstName}" type="error"}}}

              {{{Input ref="secondName" name="secondName" label="Фамилия"
                       value="${values.secondName}" onFocus=onValidate onBlur=onValidate}}}
              {{{TextBlock ref="secondNameError" text="${errors.secondName}" type="error"}}}

              {{{Input ref="login" name="login" label="Логин"
                       value="${values.login}" onFocus=onValidate onBlur=onValidate}}}
              {{{TextBlock ref="loginError" text="${errors.login}" type="error"}}}

              {{{Input ref="email" name="email" label="Почта"
                       value="${values.email}" onFocus=onValidate onBlur=onValidate}}}
              {{{TextBlock ref="emailError" text="${errors.email}" type="error"}}}

              {{{Input ref="phone" name="phone" label="Телефон"
                       value="${values.phone}" onFocus=onValidate onBlur=onValidate}}}
              {{{TextBlock ref="phoneError" text="${errors.phone}" type="error"}}}

              {{{Input ref="password" name="password" label="Пароль" type="password"
                       value="${values.password}" onFocus=onValidate onBlur=onValidate}}}
              {{{TextBlock ref="passwordError" text="${errors.password}" type="error"}}}

              {{{Input ref="confirmPassword" name="confirmPassword" label="Повторите пароль"
                       type="password"
                       value="${values.confirmPassword}" onFocus=onValidate onBlur=onValidate }}}
              {{{TextBlock ref="confirmPasswordError" text="${errors.confirmPassword}"
                           type="error"}}}

              <div class="form-group__item">
                {{{Button label="Зарегистрироваться" type="primary" onClick=onSubmit}}}
              </div>
              <div class="form-group__item">
                {{{Button label="Войти" onClick=goToChat}}}
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

    let errorMessage
    if (refName === 'firstName' || refName === 'secondName' || refName === 'confirmPassword') {
      errorMessage =
        refName === 'confirmPassword'
          ? validate(value, rulesCollection.password)
          : validate(value, rulesCollection.name)
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
