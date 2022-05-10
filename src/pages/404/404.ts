import { Component } from '../../core'

export default class NotFound extends Component {
  render() {
    // language=hbs
    return `
      {{{ErrorPage title="404" description="Не туда попали" linkHref="/" linkName="На главную" }}}
    `
  }
}
