import { Component } from '../../core'

interface IInputProps {
  name: string
  type: 'text' | 'password' | 'email'
  value?: string
  label?: string
  onFocus?: () => void
  onBlur?: () => void
  className?: string
  placeholder?: string
}

export default class Input extends Component {
  constructor({ className = 'form-group__item', ...props }: IInputProps) {
    super({ className, ...props })
  }

  init() {
    this.events = {}
    if (this.props.onBlur) {
      this.events.focusout = this.props.onBlur
    }
    if (this.props.onFocus) {
      this.events.focusin = this.props.onFocus
    }
  }

  getString = () => (this.element?.querySelector('input') as HTMLInputElement).value

  protected render() {
    // language=hbs
    return `
      <div class="{{{className}}}">
        <input type="{{type}}" name="{{name}}" {{#if placeholder}}placeholder="{{placeholder}}"{{/if}} aria-label="{{name}}" value="{{value}}" />
        {{#if label}}
          <label for="login">
            {{label}}
          </label>
        {{/if}}
      </div>
    `
  }
}
