import Chat, { chatComponents } from './pages/chat'
import Profile, { profileComponents } from './pages/profile'
import components from './components/'
import dropDown from './components/drop-down'
import Login from './pages/login'
import Registration from './pages/registration'
import NotFound from './pages/404'
import InternalServerError from './pages/500'
import { router } from './core/router'
import { registerComponent } from './core'
import './styles/colors.css'
import './styles/base.css'

components.forEach(c => registerComponent(c))
profileComponents.forEach(c => registerComponent(c))
dropDown.forEach(c => registerComponent(c))
chatComponents.forEach(c => registerComponent(c))

document.addEventListener('DOMContentLoaded', () => {
  router
    .use('/', Login)
    .use('/sign-up', Registration)
    .use('/messenger', Chat)
    .use('/profile', Profile)
    .use('/404', NotFound)
    .use('/500', InternalServerError)
    .start()
})
