import { Component } from '../../core'
import './error-page.css'

interface IErrorPage {
  title: string
  description: string
  linkHref: string
  linkName: string
}

export default class ErrorPage extends Component {
  constructor(props: IErrorPage) {
    super(props)
  }

  protected render() {
    // language=hbs
    return `
      <main>
        <div class='block-center error-block'>
          <h1 class='error-block__title'>
            {{title}}
          </h1>
          <span class='error-block__description'>
            {{description}}
          </span>
          <a href={{linkHref}} class='error-block__link'>
            {{linkName}}
          </a>
        </div>
      </main>
    `
  }
}
