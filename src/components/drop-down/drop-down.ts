import './drop-down.css'
import { Component } from '../../core'

interface IDropDown {
  listMenu: {
    title: string
    onClick: () => void
  }[]
}

export default class DropDown extends Component {
  constructor(props: IDropDown) {
    super(props)
  }

  protected render() {
    // language=hbs
    return `
      <div class="drop-down">
        {{{DropDownButton onClick=onToggleShow}}}
        {{#if isVisible}}
          <div class="drop-down__menu paper">
            <ul class="drop-down__list">
              {{#each listMenuWithCloseModal}}
              {{{DropDownItem label=this.title onClick=onClick}}}
              {{/each}}
            </ul>
          </div>
        {{/if}}
      </div>
    `
  }

  protected getStateFromProps(props: IDropDown) {
    this.state = {
      isVisible: false,
      onToggleShow: () => {
        this.setState({ isVisible: !this.state.isVisible })
      },
      listMenuWithCloseModal: props.listMenu.map(item => ({
        ...item,
        onClick: () => {
          item.onClick()
          this.state.onToggleShow()
        },
      })),
    }
  }
}
