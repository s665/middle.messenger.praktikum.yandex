import { HTTPTransport } from '../../core'

export interface IChangePasswordData {
  oldPassword: string
  newPassword: string
}

interface IChangeUserData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export default class UserApi {
  http: HTTPTransport

  constructor(http: HTTPTransport) {
    this.http = http
  }

  async changePassword(data: IChangePasswordData): Promise<XMLHttpRequest> {
    const res = await this.http.put('user/password', {
      data: { oldPassword: data.oldPassword, newPassword: data.newPassword },
    })
    return res
  }

  async changeUserData(data: IChangeUserData): Promise<XMLHttpRequest> {
    const res = await this.http.put('user/profile', {
      data: { ...data },
    })
    return res
  }

  async changeAvatar(data: FormData): Promise<XMLHttpRequest> {
    const res = await this.http.put('user/profile/avatar', {
      // @ts-ignore
      data: data,
    })
    return res
  }
}
