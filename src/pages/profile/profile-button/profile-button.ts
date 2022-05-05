import { Component } from '../../../core'
import './profile-button.css'

interface IProfileAction {
  label: string
  onClick: () => void
}

export default class ProfileButton extends Component {
  constructor(props: IProfileAction) {
    super(props)
  }

  init() {
    this.events = {}
    if (this.props.onClick) {
      this.events.click = this.props.onClick
    }
  }

  protected render() {
    // language=hbs
    return `
      <li class="item">
        <div class="label">
          <button class="profile-action">
            {{label}}
          </button>
        </div>
      </li>
    `
  }
}
