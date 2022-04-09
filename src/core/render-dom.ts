import Component from './component'

export default function renderDOM(rootSelector: string, componentPage: Component) {
  const root = document.querySelector(rootSelector)
  if (!root) {
    throw new Error('Нет элемента root')
  }
  root.innerHTML = ''

  root.appendChild(componentPage.getContent())
}
