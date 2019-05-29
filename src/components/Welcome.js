import React from 'react'
import AuthLayout from './AuthLayout'
import { inject } from 'mobx-react'
import { navigate } from '@reach/router'

const Home = ({store}) => {
  const { name } = store.CurrentUser.user

  const logout = () => {
    store.Logout()
    navigate('/app/login')
  }

  return (
    <AuthLayout>
      <p>Welcome back, {name}!</p>
      <p>
        <button onClick={logout}>
          Logout
        </button>
      </p>
    </AuthLayout>
  )
}

export default inject(`store`)(Home)
