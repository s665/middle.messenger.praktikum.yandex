import Component from './component'
import Handlebars, { HelperOptions } from 'handlebars'

export interface ComponentConstructable<Props = any> {
  new (props: Props): Component
}

export default function registerComponent(Component: ComponentConstructable) {
  Handlebars.registerHelper(
    Component.name,
    function ({ hash: { ref, ...hash }, data }: HelperOptions) {
      if (!data.root.children) {
        data.root.children = {}
      }

      if (!data.root.refs) {
        data.root.refs = {}
      }

      const { children, refs } = data.root

      const component = new Component(hash)

      children[component.id] = component

      if (ref) {
        refs[ref] = component.getContent()
      }

      return `<div data-id="${component.id}"></div>`
    }
  )
}
