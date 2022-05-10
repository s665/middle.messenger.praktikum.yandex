import { Component, renderDOM } from '../index'

export default class Route {
  readonly ComponentClass: typeof Component
  private pathname: string
  private component: Component | null
  private props: any

  constructor(pathname: string, view: typeof Component, props: any) {
    this.pathname = pathname
    this.ComponentClass = view
    this.component = null
    this.props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this.component) {
      this.component.getContent().remove()
    }
  }

  match(pathname: string) {
    return pathname === this.pathname
  }

  render() {
    if (!this.component) {
      this.component = new this.ComponentClass()
    }
    renderDOM(this.props.rootQuery, this.component)
  }
}
