import { HTTPTransport } from '../../core'

export default class ChatApi {
  http: HTTPTransport
  constructor(http: HTTPTransport) {
    this.http = http
  }

  async getChats() {
    const res = await this.http.get('chats')
    if (res.status !== 200) {
      throw new Error(res.response.reason)
    }
    return res
  }

  async getChatUser(chatId: number) {
    const res = await this.http.get(`chats/${chatId}/users`)
    if (res.status !== 200) {
      throw new Error(res.response.reason)
    }
    return res
  }

  async createChat(title: string) {
    const res = await this.http.post('chats', {
      data: {
        title: title,
      },
    })
    if (res.status !== 200) {
      throw new Error(res.response.reason)
    }
    return res
  }

  async addUserToChat(userId: number, chatId: number) {
    const res = await this.http.put('chats/users', {
      data: {
        users: [userId],
        chatId,
      },
    })
    if (res.status !== 200) {
      throw new Error(res.response.reason)
    }
    return res
  }

  async deleteUserToChat(userId: number, chatId: number) {
    const res = await this.http.delete('chats/users', {
      data: {
        users: [userId],
        chatId,
      },
    })
    if (res.status !== 200) {
      throw new Error(res.response.reason)
    }
    return res
  }

  async getToken(chatId: number) {
    const res = await this.http.post(`chats/token/${chatId}`)
    if (res.status !== 200) {
      throw new Error(res.response.reason)
    }
    return res
  }
}
