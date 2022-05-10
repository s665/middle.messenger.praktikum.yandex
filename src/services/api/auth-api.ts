import { HTTPTransport } from '../../core'

export interface LoginData {
  login: string
  password: string
}

export interface RegistrationData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export default class AuthApi {
  http: HTTPTransport
  constructor(http: HTTPTransport) {
    this.http = http
  }
  async signin(user: LoginData): Promise<XMLHttpRequest> {
    const res = await this.http.post('auth/signin', {
      data: { login: user.login, password: user.password },
    })
    return res
  }

  async signup(user: RegistrationData): Promise<XMLHttpRequest> {
    const res = await this.http.post('auth/signup', {
      data: { ...user },
    })
    return res
  }

  async logout() {
    const res = await this.http.post('auth/logout')
    return res
  }

  async getUser() {
    const res = await this.http.get('auth/user')
    return res
  }
}
