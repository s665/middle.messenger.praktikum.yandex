import { Component } from '../../core'
import './profile.css'
import api from '../../services/api'
import { router } from '../../core/router'
import { IChangePasswordData } from '../../services/api/user-api'
import store from '../../services/store'
import { IChangeUserData } from './profile-change-data/profile-change-data'

export default class Profile extends Component {
  render() {
    // language=hbs
    return `
      <main>
        {{{BackButton}}}
        <div class="block-center profile">
          {{{ProfileAvatarButton onClick=onToggleChangeAvatar avatar=user.avatar}}}
          <ul class="list">
            <li class="item">
              <div class="label">ID</div>
              <div class="value">{{user.id}}</div>
            </li>
            <li class="item">
              <div class="label">Почта</div>
              <div class="value">{{user.email}}</div>
            </li>
            <li class="item">
              <div class="label">Логин</div>
              <div class="value">{{user.login}}</div>
            </li>
            <li class="item">
              <div class="label">Имя</div>
              <div class="value">{{user.first_name}}</div>
            </li>
            <li class="item">
              <div class="label">Фамилия</div>
              <div class="value">{{user.second_name}}</div>
            </li>
            <li class="item">
              <div class="label">Имя в чате</div>
              <div class="value">{{user.display_name}}</div>
            </li>
            <li class="item">
              <div class="label">Телефон</div>
              <div class="value">{{user.phone}}</div>
            </li>
          </ul>
          <div>
            <ul class="list">
              {{{ProfileButton label="Изменить данные" onClick=onToggleChangeData}}}
              {{{ProfileButton label="Изменить пароль" onClick=onToggleChangePassword}}}
              {{{ProfileButton label="Выйти" onClick=onLogout}}}
            </ul>
          </div>
        </div>
        {{{ProfileChangePassword isVisible=isVisibleChangePasswordModal
                                 onClose=onToggleChangePassword
                                 onSubmit=onChangePassword
                                 message=changePasswordMessage}}}
        {{{ProfileChangeData isVisible=isVisibleChangeDataModal
                             onClose=onToggleChangeData
                             onSubmit=onChangeUserData
                             message=changeUserDataMessage}}}
        {{{ProfileChangeAvatar isVisible=isVisibleChangeAvatarModal
                               onClose=onToggleChangeAvatar
                               onSubmit=onChangeAvatar}}}
      </main>
    `
  }

  init() {
    if (!store.getUser()) {
      api.auth
        .getUser()
        .then(data => {
          store.setUser(data.response)
          this.setState({ user: store.getUser() })
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }

  protected getStateFromProps() {
    this.state = {
      user: store.getUser(),
      isVisibleChangePasswordModal: false,
      isVisibleChangeDataModal: false,
      isVisibleChangeAvatarModal: false,
      changePasswordMessage: '',
      changeUserDataMessage: '',
      onToggleChangeAvatar: () => {
        this.setState({
          isVisibleChangeAvatarModal: !this.state.isVisibleChangeAvatarModal,
        })
      },
      onToggleChangePassword: () => {
        this.setState({
          isVisibleChangePasswordModal: !this.state.isVisibleChangePasswordModal,
          changePasswordMessage: '',
        })
      },
      onToggleChangeData: () => {
        this.setState({
          isVisibleChangeDataModal: !this.state.isVisibleChangeDataModal,
          changeUserDataMessage: '',
        })
      },
      onChangeUserData: (data: IChangeUserData) => {
        const { login, email, secondName, firstName, displayName, phone } = data
        console.log(data)
        api.user
          .changeUserData({
            login: login,
            email: email,
            second_name: secondName,
            first_name: firstName,
            display_name: displayName,
            phone,
          })
          .then(data => {
            if (data.status !== 200) {
              this.setState({ changeUserDataMessage: data.response.reason })
            }
            if (data.status === 200) {
              store.setUser(data.response)
              this.setState({ user: data.response })
              this.state.onToggleChangeData()
            }
          })
          .catch(err => {
            throw new Error(err)
          })
      },
      onChangeAvatar: (formData: FormData) => {
        api.user
          .changeAvatar(formData)
          .then(data => {
            if (data.status === 200) {
              this.setState({ user: { ...this.state.user, avatar: data.response.avatar } })
              store.setUser({ ...this.state.user, avatar: data.response.avatar })
              this.state.onToggleChangeAvatar()
            }
          })
          .catch(err => {
            throw new Error(err)
          })
      },
      onChangePassword: (data: IChangePasswordData) => {
        api.user
          .changePassword(data)
          .then(data => {
            if (data.status === 200) {
              this.setState({ changePasswordMessage: 'Пароль успешно изменен' })
            }
          })
          .catch(err => {
            throw new Error(err)
          })
      },
      onLogout: () => {
        api.auth.logout().then(data => {
          if (data.status === 200) {
            router.go('/')
          }
        })
      },
    }
  }
}
