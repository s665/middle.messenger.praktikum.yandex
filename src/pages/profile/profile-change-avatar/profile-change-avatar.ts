import { Component } from '../../../core'

interface IProfileChangeAvatar {
  isVisible: boolean
  onSubmit: () => void
  onClose: () => void
}

export default class ProfileChangeAvatar extends Component {
  constructor(props: IProfileChangeAvatar) {
    super(props)
  }

  render() {
    // language=hbs
    return `
      <div class="change-avatar-modal">
        {{#if isVisible}}
          <div class="modal-overlay">
          </div>
          <div class="block-center">
            <div class="paper">
              <h1>Загрузите файл</h1>
              <div class="form-group">
                {{{Input ref="avatar" type="file" accept="image/*"}}}
                <div class="form-group__item">
                  {{{Button label="Сохранить" type="primary" onClick=onChange}}}
                </div>
                <div class="form-group__item">
                  {{{Button label="Отмена" onClick=onClose}}}
                </div>
              </div>
            </div>
          </div>
        {{/if}}
      </div>
    `
  }

  protected getStateFromProps() {
    this.state = {
      onChange: () => {
        const fd = new FormData()
        if (document.querySelector('input[type=file]') as HTMLInputElement) {
          fd.append(
            'avatar',
            (document.querySelector('input[type=file]') as HTMLInputElement)!.files![0]
          )
        }
        this.props.onSubmit(fd)
      },
    }
  }
}
