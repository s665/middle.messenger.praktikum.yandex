import { Component } from '../../core'
import backIcon from '../../../static/icons/left.svg'
import { router } from '../../core/router'
import './back-button.css'

export default class BackButton extends Component {
  protected init() {
    this.events = {
      click: () => {
        router.back()
      },
    }
  }

  render() {
    // language=hbs
    return `
      <button class="backButton">
        <div class="icon">
          <img src="${backIcon}" alt="back"  width="15px" height="15px"/>
        </div>
      </button>
    `
  }
}
