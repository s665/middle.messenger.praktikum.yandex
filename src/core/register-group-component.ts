import { Component, registerComponent } from './index'

const registerGroupComponent = (components: { [key: string]: { default: typeof Component } }) => {
  Object.entries(components).forEach(([name, component]) => {
    const componentName = name
      .split('-')
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join('')
    registerComponent(componentName, component.default)
  })
}

export default registerGroupComponent
