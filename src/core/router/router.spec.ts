import 'global-jsdom/register'
import { expect } from 'chai'
import { router } from './index'
import { Component } from '../index'

class StubHome extends Component {
  render() {
    return `<div>StubHome</div>`
  }
}

class StubMessenger extends Component {
  render() {
    return `<div>StubMessenger</div>`
  }
}

describe('Test Router', () => {
  before(() => {
    const app = document.createElement('div')
    app.setAttribute('id', 'app')
    document.body.appendChild(app)
    router.use('/', StubHome).use('/messenger', StubMessenger).start()
  })
  it('Change route', () => {
    router.go('/')
    router.go('/messenger')
    expect(window.history.length).to.eq(3)
  })
  it('Get pathname', () => {
    router.go('/messenger')
    expect(window.location.pathname).to.eq('/messenger')
  })
})
