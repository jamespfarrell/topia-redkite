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
    debugger
    this.CurrentUser = user
  }

  UpdateProfile(data) {
    this.CurrentUser.user = data
  }

  Logout() {
    this.CurrentUser = {}
  }
}
decorate(SessionModel, {
  CurrentUser: [observable, persist('object')],
  Login: action,
  Logout: action,
  UpdateProfile: action,
  isLoggedIn: computed,
  isAdmin: computed
})

const SessionStore = new SessionModel()

if (typeof window !== `undefined`) {
  const hydrate = create({
    storage: window.localStorage,
    jsonify: true
  })

  hydrate('store', SessionStore).then(() => console.log('store has been hydrated'))
}


export default SessionStore
