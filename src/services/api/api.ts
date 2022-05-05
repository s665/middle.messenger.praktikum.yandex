import { HTTPTransport } from '../../core'
import AuthApi from './auth-api'
import UserApi from './user-api'
import ChatApi from './chat-api'

class Api {
  http: HTTPTransport
  auth: AuthApi
  user: UserApi
  chat: ChatApi

  constructor() {
    this.http = new HTTPTransport()
    this.auth = new AuthApi(this.http)
    this.user = new UserApi(this.http)
    this.chat = new ChatApi(this.http)
  }
}

export default new Api()
