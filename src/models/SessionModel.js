import { observable, action, decorate, computed } from "mobx"
import { create, persist } from 'mobx-persist'

class SessionModel {
  CurrentUser = {}

  get isLoggedIn() {
    return this.CurrentUser.token !== undefined
  }

  get isAdmin() {
    return this.CurrentUser.user && this.CurrentUser.user.role === 'admin'
  }

  Login(user) {
    this.CurrentUser = user
  }

  Logout() {
    this.CurrentUser = {}
  }
}
decorate(SessionModel, {
  CurrentUser: [observable, persist('object')],
  Login: action,
  Logout: action,
  isLoggedIn: computed,
  isAdmin: computed
})

const SessionStore = new SessionModel()

if (typeof window !== `undefined`) {
  const hydrate = create({
    storage: window.localStorage,
    jsonify: true
  })

  hydrate('store', SessionStore).then(() => console.log('someStore has been hydrated'))
}


export default SessionStore
