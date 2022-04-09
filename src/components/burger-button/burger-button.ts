import Button from '../button'
import './burger-button.css'

export default class BurgerButton extends Button {
  render() {
    // language=hbs
    return `
      <div class="burger">
        <div class="burger__line"></div>
      </div>
    `
  }
}
