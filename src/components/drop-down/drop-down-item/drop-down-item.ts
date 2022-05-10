import Button from '../../button'

export default class DropDownItem extends Button {
  render() {
    // language=hbs
    return `
      <li class="drop-down__list-item">
        <button>{{label}}</button>
      </li>
    `
  }
}
