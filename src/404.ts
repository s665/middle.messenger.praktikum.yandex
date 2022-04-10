import { renderDOM } from './core'
import Error from './pages/error'

document.addEventListener('DOMContentLoaded', () => {
  const error = new Error({
    title: '404',
    description: 'Не туда попали',
    linkHref: 'index.html',
    linkName: 'На главную',
  })

  renderDOM('#app', error)
})
