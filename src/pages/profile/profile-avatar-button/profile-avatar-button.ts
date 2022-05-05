import imageIcon from '../../../../static/icons/image.svg'
import './profile-avatar-button.css'
import Button from '../../../components/button'

interface IProfileAvatarButton {
  avatar: string
}

export default class ProfileAvatarButton extends Button {
  protected render() {
    // language=hbs
    return `
      <button class="profile-avatar-button">
        {{#if avatar}}
          <img src="${this.state.avatarImg}" alt="profileImg" width="100%" height="100%">
        {{else}}
          <img src="${imageIcon}" alt="img" width="50px" height="50px">
        {{/if}}

        <div class="profile-avatar-button__label">Изменить аватар</div>
      </button>
    `
  }

  protected getStateFromProps(props: IProfileAvatarButton) {
    this.state = {
      avatarImg: `https://ya-praktikum.tech/api/v2/resources${props.avatar}`,
    }
  }
}
