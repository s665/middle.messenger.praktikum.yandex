import { Component } from '../../core'

export default class InternalServerError extends Component {
  render() {
    // language=hbs
    return `
      {{{ErrorPage title="500" description="Мы уже фиксим" linkHref="/" linkName="На главную" }}}
    `
  }
}
