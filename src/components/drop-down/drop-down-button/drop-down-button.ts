import Button from '../../button'

export default class DropDownButton extends Button {
  render() {
    // language=hbs
    return `
      <button class="drop-down__button">
        <span class="dot"></span>
      </button>
    `
  }
}
