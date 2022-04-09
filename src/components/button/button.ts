import { Component } from '../../core'
import './buttons.css'

interface IButtonProps {
  type?: 'primary'
  className?: string
  label?: string
  onClick?: () => void
}

export default class Button extends Component {
  constructor(props: IButtonProps) {
    super(props)
  }

  init() {
    this.events = {}

    this.events.click = this.props.onClick
  }

  protected render(): string {
    // language=hbs
    return `
      <button class="button {{type}} {{className}}">{{label}}</button>
    `
  }
}
