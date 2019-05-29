import React from 'react'
import { navigate } from 'gatsby'
import { inject } from 'mobx-react'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, store, location, ...rest } = this.props

    if (!store.isLoggedIn && location.pathname !== `/app/login`) {
      // If we’re not logged in, redirect to the home page.
      navigate(`/app/login`)
      return null
    }

    return <Component {...rest} />
  }
}

export default inject('store')(PrivateRoute)
