import { Component } from '../../core'
import './text-block.css'

interface IError {
  text?: string
  className?: string
  type?: 'primary' | 'error'
}

export default class TextBlock extends Component {
  constructor(props: IError) {
    super(props)
  }

  protected render() {
    // language=hbs
    return `
      <div class="text-block">
        {{#if text}}
          <div class="mini {{className}} {{type}}">{{text}}</div>
        {{/if}}
      </div>
    `
  }
}
