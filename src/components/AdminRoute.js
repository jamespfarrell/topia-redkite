import React from 'react'
import { navigate } from 'gatsby'
import { inject } from 'mobx-react'

class AdminRoute extends React.Component {
  render() {
    const { component: Component, store, location, ...rest } = this.props

    if (typeof window !== `undefined` && !store.isLoggedIn && !store.isAdmin) {
      // If we’re not logged in, redirect to the home page.
      navigate(`/app/login`)
      return null
    }

    return <Component {...rest} />
  }
}

export default inject('store')(AdminRoute)
