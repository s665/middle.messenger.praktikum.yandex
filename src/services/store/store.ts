import EventBus from '../../core/event-bus'

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name?: string
  login: string
  password?: string
  avatar?: string
  email: string
  phone: string
  ref?: string
}

interface UserStore {
  user: User | null
}

class Store {
  static EVENTS = {
    SET_USER: 'store:set-user',
    DELETE_USER: 'store:delete-user',
  } as const

  store: UserStore
  eventBus: EventBus

  constructor() {
    this.store = { user: null }
    this.eventBus = new EventBus()
  }

  getUser = () => {
    return this.store.user
  }

  setUser = (user: User) => {
    this.store.user = user
    this.eventBus.emit(Store.EVENTS.SET_USER)
  }

  deleteUser() {
    this.store.user = null
    this.eventBus.emit(Store.EVENTS.DELETE_USER)
  }
}

export default new Store()
